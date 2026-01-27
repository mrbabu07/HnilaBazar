const CACHE_NAME = "hnilabazar-v1.0.0";
const STATIC_CACHE = "hnilabazar-static-v1.0.0";
const DYNAMIC_CACHE = "hnilabazar-dynamic-v1.0.0";

// Assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/products",
  "/cart",
  "/wishlist",
  "/orders",
  "/manifest.json",
  // Add critical CSS and JS files
  "/src/index.css",
  "/src/main.jsx",
  // Fallback pages
  "/offline.html",
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/api\/products/,
  /\/api\/categories/,
  /\/api\/user/,
  /\/api\/wishlist/,
  /\/api\/reviews/,
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker: Installing...");

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("📦 Service Worker: Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log("✅ Service Worker: Installation complete");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("❌ Service Worker: Installation failed", error);
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("🚀 Service Worker: Activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("🗑️ Service Worker: Deleting old cache", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        console.log("✅ Service Worker: Activation complete");
        return self.clients.claim();
      }),
  );
});

// Fetch event - serve cached content when offline
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Handle API requests
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle navigation requests
  if (request.mode === "navigate") {
    event.respondWith(handleNavigationRequest(request));
    return;
  }

  // Handle other requests (images, CSS, JS)
  event.respondWith(handleResourceRequest(request));
});

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  const url = new URL(request.url);

  // Check if this API should be cached
  const shouldCache = API_CACHE_PATTERNS.some((pattern) =>
    pattern.test(url.pathname),
  );

  if (!shouldCache) {
    // For non-cacheable APIs, just try network
    try {
      return await fetch(request);
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Network unavailable",
          offline: true,
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  }

  try {
    // Try network first
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    console.log(
      "📡 Service Worker: Network failed, trying cache for",
      request.url,
    );
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline response for API
    return new Response(
      JSON.stringify({
        success: false,
        error: "Content not available offline",
        offline: true,
        data: [],
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

// Handle navigation requests
async function handleNavigationRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    // Network failed, serve cached page or offline page
    console.log(
      "📡 Service Worker: Navigation offline, serving cached content",
    );

    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Serve offline page
    const offlinePage = await caches.match("/offline.html");
    if (offlinePage) {
      return offlinePage;
    }

    // Fallback offline response
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Offline - HnilaBazar</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .offline-container { max-width: 400px; margin: 0 auto; }
            .offline-icon { font-size: 64px; margin-bottom: 20px; }
            h1 { color: #333; margin-bottom: 10px; }
            p { color: #666; margin-bottom: 30px; }
            .retry-btn { 
              background: #3B82F6; color: white; border: none; 
              padding: 12px 24px; border-radius: 6px; cursor: pointer;
              font-size: 16px;
            }
            .retry-btn:hover { background: #2563EB; }
          </style>
        </head>
        <body>
          <div class="offline-container">
            <div class="offline-icon">📱</div>
            <h1>You're Offline</h1>
            <p>Please check your internet connection and try again.</p>
            <button class="retry-btn" onclick="window.location.reload()">
              Try Again
            </button>
          </div>
        </body>
      </html>
    `,
      {
        headers: { "Content-Type": "text/html" },
      },
    );
  }
}

// Handle resource requests (images, CSS, JS)
async function handleResourceRequest(request) {
  // Try cache first for resources
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    // Try network
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // For images, return a placeholder
    if (request.destination === "image") {
      return new Response(
        `
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="#f3f4f6"/>
          <text x="100" y="100" text-anchor="middle" dy=".3em" fill="#9ca3af">
            Image Unavailable
          </text>
        </svg>
      `,
        {
          headers: { "Content-Type": "image/svg+xml" },
        },
      );
    }

    throw error;
  }
}

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  console.log("🔄 Service Worker: Background sync triggered", event.tag);

  if (event.tag === "background-sync-cart") {
    event.waitUntil(syncCartData());
  }

  if (event.tag === "background-sync-wishlist") {
    event.waitUntil(syncWishlistData());
  }
});

// Sync cart data when back online
async function syncCartData() {
  try {
    // Get pending cart actions from IndexedDB
    const pendingActions = await getPendingCartActions();

    for (const action of pendingActions) {
      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(action),
        });

        // Remove from pending actions
        await removePendingCartAction(action.id);
      } catch (error) {
        console.error("Failed to sync cart action:", error);
      }
    }
  } catch (error) {
    console.error("Background sync failed:", error);
  }
}

// Sync wishlist data when back online
async function syncWishlistData() {
  try {
    // Similar implementation for wishlist
    console.log("Syncing wishlist data...");
  } catch (error) {
    console.error("Wishlist sync failed:", error);
  }
}

// Push notification event
self.addEventListener("push", (event) => {
  console.log("📬 Service Worker: Push notification received");

  const options = {
    body: "You have new updates from HnilaBazar!",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "View Details",
        icon: "/icons/icon-96x96.png",
      },
      {
        action: "close",
        title: "Close",
        icon: "/icons/icon-96x96.png",
      },
    ],
  };

  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
    options.title = data.title || "HnilaBazar";
    options.data = { ...options.data, ...data };
  }

  event.waitUntil(self.registration.showNotification("HnilaBazar", options));
});

// Notification click event
self.addEventListener("notificationclick", (event) => {
  console.log("🔔 Service Worker: Notification clicked");

  event.notification.close();

  if (event.action === "explore") {
    // Open the app to a specific page
    event.waitUntil(clients.openWindow("/"));
  } else if (event.action === "close") {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(clients.openWindow("/"));
  }
});

// Helper functions for IndexedDB operations
async function getPendingCartActions() {
  // Implementation for getting pending actions from IndexedDB
  return [];
}

async function removePendingCartAction(id) {
  // Implementation for removing action from IndexedDB
  console.log("Removing pending cart action:", id);
}

// Message event for communication with main thread
self.addEventListener("message", (event) => {
  console.log("💬 Service Worker: Message received", event.data);

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

console.log("🎉 Service Worker: Script loaded successfully");
