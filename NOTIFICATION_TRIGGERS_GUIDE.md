# Notification Triggers Guide - User & Admin

## Overview

This guide explains when and how notifications are triggered for both customers and admins in the HnilaBazar e-commerce platform.

## Current Implementation Status

### ✅ Implemented (Client-Side)

These notifications work immediately and are stored per user in localStorage:

#### Customer Notifications

1. **Order Placed** - When customer completes checkout
2. **Return Request Submitted** - When customer submits a return request

#### Admin Notifications

- Admins see toast notifications for their actions (order updates, refunds, product management)

### 🔄 Requires Backend Implementation

For cross-device and real-time notifications, backend implementation is needed:

## Notification Flow

### Customer Journey

#### 1. Order Placed ✅ (Implemented)

**Trigger:** `Client/src/pages/Checkout.jsx`

```javascript
// After successful order creation
addNotification({
  type: "order",
  title: "Order Placed Successfully!",
  message: `Your order #${orderId} has been placed and is being processed.`,
  link: "/orders",
});
```

**When:** Immediately after order is created
**Color:** Blue 🛍️
**Action:** Click to view order details

#### 2. Order Status Updates (Requires Backend)

**Trigger:** When admin updates order status in `AdminOrders.jsx`
**Notifications to send:**

- **Processing:** "Your order is being prepared"
- **Shipped:** "Your order has been shipped! Track: [tracking number]"
- **Delivered:** "Your order has been delivered. Enjoy your purchase!"
- **Cancelled:** "Your order has been cancelled"

**Implementation needed:**

```javascript
// Backend: Server/controllers/orderController.js
// When order status is updated, send notification to customer
await sendNotificationToUser(order.userId, {
  type: order.status === "shipped" ? "delivery" : "order",
  title: getStatusTitle(order.status),
  message: getStatusMessage(order.status, order._id),
  link: "/orders",
});
```

#### 3. Return Request Submitted ✅ (Implemented)

**Trigger:** `Client/src/pages/Orders.jsx`

```javascript
// After return request is created
addNotification({
  type: "return",
  title: "Return Request Submitted",
  message: "Your return request has been submitted and is under review.",
  link: "/returns",
});
```

**When:** Immediately after return request is submitted
**Color:** Yellow ↩️
**Action:** Click to view return status

#### 4. Return Status Updates (Requires Backend)

**Trigger:** When admin updates return status in `AdminReturns.jsx`
**Notifications to send:**

- **Approved:** "Your return request has been approved"
- **Rejected:** "Your return request has been rejected. Reason: [reason]"
- **Processing:** "Your return is being processed"
- **Completed:** "Your return has been completed"

#### 5. Refund Processed (Requires Backend)

**Trigger:** When admin processes refund in `AdminReturns.jsx`

```javascript
// Backend implementation needed
await sendNotificationToUser(return.userId, {
  type: "refund",
  title: "Refund Processed",
  message: `Your refund of ৳${amount} has been processed to your ${method} account.`,
  link: "/returns",
});
```

**When:** After refund is processed
**Color:** Green 💰
**Action:** Click to view refund details

### Admin Journey

#### 1. New Order Received (Requires Backend)

**Trigger:** When customer places order
**Notification to admin:**

```javascript
addNotification({
  type: "order",
  title: "New Order Received!",
  message: `Order #${orderId} from ${customerName} - ৳${total}`,
  link: "/admin/orders",
});
```

**Color:** Blue 🛍️
**Action:** Click to view order details

#### 2. Return Request Received (Requires Backend)

**Trigger:** When customer submits return request
**Notification to admin:**

```javascript
addNotification({
  type: "return",
  title: "New Return Request",
  message: `Return request for order #${orderId} - ${productName}`,
  link: "/admin/returns",
});
```

**Color:** Yellow ↩️
**Action:** Click to manage return

#### 3. Low Stock Alert (Requires Backend)

**Trigger:** When product stock falls below threshold
**Notification to admin:**

```javascript
addNotification({
  type: "product",
  title: "Low Stock Alert",
  message: `${productName} has only ${stock} items left`,
  link: "/admin/products",
});
```

**Color:** Purple 🆕
**Action:** Click to restock

## Implementation Guide

### For Client-Side Notifications (Current)

**Step 1:** Import the notification hook

```javascript
import { useNotifications } from "../context/NotificationContext";
```

**Step 2:** Get the addNotification function

```javascript
const { addNotification } = useNotifications();
```

**Step 3:** Trigger notification

```javascript
addNotification({
  type: "order", // order, return, refund, cancel, product, delivery
  title: "Notification Title",
  message: "Notification message",
  link: "/relevant-page", // Where to navigate when clicked
});
```

### For Backend Implementation (Future)

**Step 1:** Create notification service

```javascript
// Server/services/notificationService.js
export const sendNotificationToUser = async (userId, notification) => {
  // Store in database
  await Notification.create({
    userId,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    link: notification.link,
    read: false,
    createdAt: new Date(),
  });

  // Optional: Send push notification, email, SMS
};
```

**Step 2:** Create notification model

```javascript
// Server/models/Notification.js
const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: {
    type: String,
    enum: ["order", "return", "refund", "cancel", "product", "delivery"],
    required: true,
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  link: { type: String },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
```

**Step 3:** Create API endpoints

```javascript
// Server/routes/notificationRoutes.js
router.get("/notifications", auth, getNotifications);
router.put("/notifications/:id/read", auth, markAsRead);
router.delete("/notifications/:id", auth, deleteNotification);
```

**Step 4:** Update frontend to fetch from backend

```javascript
// Client/src/context/NotificationContext.jsx
// Fetch notifications from API instead of localStorage
useEffect(() => {
  if (user) {
    fetchNotificationsFromAPI();
  }
}, [user]);
```

## Notification Types & Use Cases

| Type     | Icon | Color  | Customer Use Case            | Admin Use Case              |
| -------- | ---- | ------ | ---------------------------- | --------------------------- |
| order    | 🛍️   | Blue   | Order placed, status updates | New order received          |
| return   | ↩️   | Yellow | Return request submitted     | New return request          |
| refund   | 💰   | Green  | Refund processed             | Refund completed            |
| cancel   | ❌   | Red    | Order cancelled              | Order cancelled by customer |
| product  | 🆕   | Purple | New product available        | Low stock alert             |
| delivery | 🚚   | Indigo | Order shipped/delivered      | Delivery updates            |

## Testing Checklist

### Customer Notifications

- [x] Order placed notification appears
- [x] Return request notification appears
- [x] Notifications persist after page reload
- [x] Clicking notification navigates to correct page
- [x] Unread count updates correctly
- [ ] Order status update notifications (requires backend)
- [ ] Refund processed notifications (requires backend)

### Admin Notifications

- [ ] New order notification (requires backend)
- [ ] New return request notification (requires backend)
- [ ] Low stock alerts (requires backend)
- [x] Toast notifications for admin actions work

## Current Behavior

### What Works Now (Client-Side)

1. **Customer places order** → Customer sees "Order Placed" notification
2. **Customer requests return** → Customer sees "Return Request Submitted" notification
3. **Admin updates order** → Admin sees toast notification (not stored)
4. **Admin processes refund** → Admin sees toast notification (not stored)
5. **Notifications persist** → Stored in localStorage per user
6. **Unread count** → Shows number of unread notifications
7. **Mark as read** → Can mark individual or all notifications as read

### What Needs Backend

1. **Cross-device sync** → Notifications appear on all devices
2. **Admin receives notifications** → When customers place orders or request returns
3. **Customer receives updates** → When admin updates order status or processes refund
4. **Real-time updates** → Using WebSockets or polling
5. **Notification history** → Stored in database, not just localStorage

## Benefits of Current Implementation

✅ **Immediate feedback** - Users get instant confirmation of their actions
✅ **No backend required** - Works with current setup
✅ **Persistent** - Notifications saved in localStorage
✅ **Professional UI** - Matches Amazon/Daraz level quality
✅ **User-friendly** - Clear, color-coded, actionable notifications

## Benefits of Backend Implementation (Future)

🚀 **Cross-device sync** - Notifications on all devices
🚀 **Real-time updates** - Instant notifications for all events
🚀 **Admin notifications** - Admins get notified of customer actions
🚀 **Scalable** - Can handle thousands of users
🚀 **Analytics** - Track notification engagement
🚀 **Push notifications** - Browser/mobile push notifications

## Recommendation

The current client-side implementation provides excellent user experience for immediate feedback. For a production e-commerce platform, I recommend implementing the backend notification system to enable:

1. Admin notifications when customers place orders
2. Customer notifications when admins update order status
3. Cross-device notification sync
4. Notification history and analytics

This would require:

- Notification model and database schema
- API endpoints for notifications
- WebSocket or polling for real-time updates
- Optional: Push notification service integration
