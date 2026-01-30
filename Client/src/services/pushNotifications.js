import { auth } from "../firebase/firebase.config";
import { api } from "./api";

class PushNotificationService {
  constructor() {
    this.registration = null;
    this.subscription = null;
    this.isSupported = "serviceWorker" in navigator && "PushManager" in window;
  }

  // Initialize push notifications
  async initialize() {
    if (!this.isSupported) {
      console.warn("Push notifications are not supported");
      return false;
    }

    try {
      // Register service worker
      this.registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered:", this.registration);

      // Check if already subscribed
      this.subscription = await this.registration.pushManager.getSubscription();

      return true;
    } catch (error) {
      console.error("Failed to initialize push notifications:", error);
      return false;
    }
  }

  // Request permission and subscribe
  async subscribe() {
    if (!this.registration) {
      await this.initialize();
    }

    try {
      // Request permission
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        throw new Error("Permission denied");
      }

      // Subscribe to push notifications
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          import.meta.env.VITE_VAPID_PUBLIC_KEY ||
            "BEl62iUYgUivxIkv69yViEuiBIa40HI6YrrC_VXBkuhHdQjM8B3PUBiWWBBWRrZ0bEuMiMhridPiRw3MoE0QgYg",
        ),
      });

      this.subscription = subscription;

      // Send subscription to server
      await this.sendSubscriptionToServer(subscription);

      return subscription;
    } catch (error) {
      console.error("Failed to subscribe to push notifications:", error);
      throw error;
    }
  }

  // Unsubscribe from push notifications
  async unsubscribe() {
    if (!this.subscription) {
      return true;
    }

    try {
      await this.subscription.unsubscribe();
      await this.removeSubscriptionFromServer();
      this.subscription = null;
      return true;
    } catch (error) {
      console.error("Failed to unsubscribe:", error);
      return false;
    }
  }

  // Check if subscribed
  isSubscribed() {
    return !!this.subscription;
  }

  // Get subscription status
  async getSubscriptionStatus() {
    if (!this.registration) {
      return { supported: false, subscribed: false, permission: "default" };
    }

    const subscription = await this.registration.pushManager.getSubscription();

    return {
      supported: this.isSupported,
      subscribed: !!subscription,
      permission: Notification.permission,
    };
  }

  // Send subscription to server
  async sendSubscriptionToServer(subscription) {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await api.post("/notifications/subscribe", {
        subscription: subscription.toJSON(),
        userId: user.uid,
      });
    } catch (error) {
      console.error("Failed to send subscription to server:", error);
    }
  }

  // Remove subscription from server
  async removeSubscriptionFromServer() {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await api.delete("/notifications/unsubscribe");
    } catch (error) {
      console.error("Failed to remove subscription from server:", error);
    }
  }

  // Show local notification
  showLocalNotification(title, options = {}) {
    if (!this.isSupported || Notification.permission !== "granted") {
      return;
    }

    const defaultOptions = {
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-72x72.png",
      vibrate: [100, 50, 100],
      requireInteraction: false,
      ...options,
    };

    return new Notification(title, defaultOptions);
  }

  // Utility function to convert VAPID key
  urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

export default new PushNotificationService();
