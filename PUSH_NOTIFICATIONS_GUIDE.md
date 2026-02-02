# 📱 Push Notifications System - Complete Guide

## Overview

HnilaBazar now includes a comprehensive push notification system that keeps users engaged with real-time updates about their orders, flash sales, and other important events. The system is built using Web Push API with VAPID authentication and integrates seamlessly with the existing PWA infrastructure.

## ✨ Features Implemented

### 🔔 Notification Types

- **Order Status Updates** - Notify users when order status changes (pending → processing → shipped → delivered)
- **Flash Sale Alerts** - Alert users about new flash sales and limited-time offers
- **Back in Stock** - Notify users when wishlist items become available
- **Abandoned Cart Reminders** - Remind users about items left in their cart
- **Wishlist Sales** - Alert when wishlist items go on sale
- **New Product Notifications** - Notify about new products in favorite categories
- **Review Reminders** - Remind users to review purchased products

### 🎛️ User Controls

- **Notification Settings Page** - Complete control panel in user profile
- **Granular Preferences** - Enable/disable specific notification types
- **Easy Toggle** - One-click enable/disable all notifications
- **Test Functionality** - Users can test notifications before enabling

### 🔧 Technical Features

- **VAPID Authentication** - Secure push notification delivery
- **Service Worker Integration** - Works offline and when app is closed
- **Automatic Subscription Management** - Handles invalid subscriptions
- **Fallback Support** - Graceful degradation for unsupported browsers
- **Database Integration** - Stores user preferences and subscription data

## 🏗️ Architecture

### Client-Side Components

#### 1. Push Notification Service (`Client/src/services/pushNotifications.js`)

- Handles subscription management
- Manages VAPID key configuration
- Provides utility functions for notification handling

#### 2. Notification Settings Component (`Client/src/components/NotificationSettings.jsx`)

- User interface for managing notification preferences
- Real-time subscription status display
- Test notification functionality

#### 3. Enhanced Service Worker (`Client/public/sw.js`)

- Handles incoming push notifications
- Manages notification display and click actions
- Routes users to appropriate pages based on notification type

### Server-Side Components

#### 1. Notification Controller (`Server/controllers/notificationController.js`)

- Handles subscription/unsubscription requests
- Manages user notification preferences
- Sends push notifications to users

#### 2. Notification Service (`Server/services/notificationService.js`)

- High-level notification sending functions
- Predefined notification templates
- Integration with business logic

#### 3. Notification Model (`Server/models/NotificationSubscription.js`)

- Database schema for storing subscriptions
- User preference management
- Subscription validation and cleanup

## 🚀 Setup Instructions

### 1. Generate VAPID Keys

```bash
# In the Server directory
npm run generate:vapid
```

This will generate public and private VAPID keys. Add them to your `.env` file:

```env
VAPID_PUBLIC_KEY=your_generated_public_key
VAPID_PRIVATE_KEY=your_generated_private_key
VAPID_EMAIL=mailto:admin@hnilabazar.com
```

### 2. Update Client Configuration

The client automatically uses the same public key. If you generate new keys, update the public key in:

- `Client/src/services/pushNotifications.js`

### 3. Test the System

```bash
# Start the server
npm run dev

# In another terminal, test push notifications
npm run test:push
```

## 📱 User Experience

### Enabling Notifications

1. User visits their Profile page
2. Scrolls to "Push Notifications" section
3. Clicks "Enable Notifications"
4. Browser prompts for permission
5. User grants permission
6. System automatically subscribes user
7. Success notification is shown

### Managing Preferences

Users can control which types of notifications they receive:

- ✅ Order Updates (recommended)
- ✅ Flash Sale Alerts
- ✅ Back in Stock notifications
- ✅ Cart Reminders
- ✅ Wishlist Sales
- ❌ New Products (disabled by default)
- ✅ Review Reminders

### Notification Experience

When a notification arrives:

1. **Display**: Shows with app icon, title, and message
2. **Actions**: "View Details" and "Close" buttons
3. **Click Behavior**: Opens app to relevant page
4. **Auto-dismiss**: Closes after 5 seconds for local notifications

## 🔧 Integration Points

### Order Status Updates

Automatically triggered when admin updates order status:

```javascript
// In orderController.js
await NotificationService.sendOrderStatusNotification(order.userId, {
  _id: orderId,
  status: newStatus,
  trackingNumber,
});
```

### Flash Sale Alerts

Triggered when new flash sales are created:

```javascript
// In flashSaleController.js
await NotificationService.sendFlashSaleAlert({
  _id: flashSale._id,
  title: flashSale.title,
  discountPercentage: flashSale.discountPercentage,
});
```

### Custom Notifications

Send custom notifications using the service:

```javascript
const NotificationService = require("../services/notificationService");

await NotificationService.sendBackInStockNotification(productData, [userId]);
```

## 🧪 Testing

### Manual Testing

1. **Enable notifications** in Profile page
2. **Test notification** using the test button
3. **Update order status** in admin panel
4. **Create flash sale** in admin panel
5. **Check browser notifications**

### Automated Testing

```bash
# Test push notification system
npm run test:push

# Check subscription status
# Visit: http://localhost:5000/api/notifications/test
```

### Browser Developer Tools

1. Open DevTools → Application → Service Workers
2. Check "Push Messaging" section
3. View notification subscriptions
4. Test offline functionality

## 🔒 Security & Privacy

### VAPID Keys

- Public key is safe to expose in client code
- Private key must be kept secure on server
- Keys should be rotated periodically

### User Privacy

- Users control all notification preferences
- Easy unsubscribe mechanism
- No tracking of notification interactions
- Subscriptions automatically cleaned up when invalid

### Data Storage

- Minimal data stored (subscription endpoint, preferences)
- No personal information in notification payloads
- Automatic cleanup of inactive subscriptions

## 🚨 Troubleshooting

### Common Issues

#### 1. Notifications Not Appearing

- Check browser notification permissions
- Verify VAPID keys are correct
- Ensure service worker is registered
- Check browser console for errors

#### 2. Subscription Fails

- Verify VAPID public key matches server
- Check network connectivity
- Ensure HTTPS is used (required for push notifications)
- Clear browser cache and try again

#### 3. Server Errors

- Verify web-push package is installed
- Check VAPID keys in environment variables
- Ensure MongoDB connection is working
- Check server logs for detailed errors

### Debug Commands

```bash
# Check subscription status
curl http://localhost:5000/api/notifications/test

# View server logs
npm run dev

# Test notification sending
npm run test:push
```

## 📈 Analytics & Monitoring

### Metrics to Track

- Subscription rates
- Notification delivery success rates
- User engagement with notifications
- Unsubscribe rates
- Notification click-through rates

### Logging

The system includes comprehensive logging:

- Subscription events
- Notification sending results
- Error tracking
- User preference changes

## 🔮 Future Enhancements

### Planned Features

- **Scheduled Notifications** - Send notifications at optimal times
- **A/B Testing** - Test different notification content
- **Rich Notifications** - Include images and action buttons
- **Geolocation Targeting** - Location-based notifications
- **Advanced Analytics** - Detailed engagement metrics

### Integration Opportunities

- **Email Fallback** - Send email if push notification fails
- **SMS Integration** - Multi-channel notification delivery
- **Social Media** - Share notifications on social platforms
- **Webhook Support** - Third-party integrations

## 📚 API Reference

### Subscription Management

```javascript
// Subscribe to notifications
POST /api/notifications/subscribe
{
  "subscription": { /* PushSubscription object */ },
  "userAgent": "browser info",
  "timestamp": "2024-01-01T00:00:00Z"
}

// Unsubscribe
POST /api/notifications/unsubscribe
{
  "subscription": { /* PushSubscription object */ }
}

// Update preferences
POST /api/user/notification-preferences
{
  "order_status": true,
  "flash_sale": true,
  "back_in_stock": false
}
```

### Sending Notifications

```javascript
// Send to specific users
NotificationService.sendOrderStatusNotification(userId, orderData);

// Send by notification type
NotificationService.sendFlashSaleAlert(flashSaleData, userIds);

// Send custom notification
NotificationService.sendNotification(userIds, notificationData);
```

## 🎉 Success Metrics

The push notification system is considered successful when:

- ✅ 70%+ of users enable notifications
- ✅ 90%+ notification delivery success rate
- ✅ 15%+ click-through rate on notifications
- ✅ <5% unsubscribe rate
- ✅ Increased user engagement and retention

---

## 🏁 Conclusion

The push notification system is now fully implemented and ready for production use. It provides a seamless, user-friendly experience while maintaining high security and privacy standards. The system is designed to scale and can be easily extended with additional notification types and features.

For support or questions, refer to the troubleshooting section or check the server logs for detailed error information.
