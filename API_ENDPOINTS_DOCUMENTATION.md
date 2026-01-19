# API Endpoints Documentation

## Total API Endpoints: **78 endpoints**

---

## 1. Address Routes (8 endpoints)

**Base URL:** `/api/addresses`

| Method | Endpoint       | Auth Required | Description                |
| ------ | -------------- | ------------- | -------------------------- |
| GET    | `/`            | ✅ User       | Get user's addresses       |
| GET    | `/default`     | ✅ User       | Get user's default address |
| GET    | `/:id`         | ✅ User       | Get specific address       |
| POST   | `/`            | ✅ User       | Create new address         |
| PUT    | `/:id`         | ✅ User       | Update address             |
| DELETE | `/:id`         | ✅ User       | Delete address             |
| PATCH  | `/:id/default` | ✅ User       | Set as default address     |

---

## 2. Category Routes (5 endpoints)

**Base URL:** `/api/categories`

| Method | Endpoint | Auth Required | Description        |
| ------ | -------- | ------------- | ------------------ |
| GET    | `/`      | ❌ Public     | Get all categories |
| GET    | `/:id`   | ❌ Public     | Get category by ID |
| POST   | `/`      | ✅ Admin      | Create category    |
| PUT    | `/:id`   | ✅ Admin      | Update category    |
| DELETE | `/:id`   | ✅ Admin      | Delete category    |

---

## 3. Coupon Routes (8 endpoints)

**Base URL:** `/api/coupons`

| Method | Endpoint    | Auth Required | Description           |
| ------ | ----------- | ------------- | --------------------- |
| GET    | `/active`   | ❌ Public     | Get active coupons    |
| POST   | `/validate` | ❌ Public     | Validate coupon code  |
| POST   | `/apply`    | ✅ User       | Apply coupon to order |
| GET    | `/`         | ✅ Admin      | Get all coupons       |
| GET    | `/:id`      | ✅ Admin      | Get coupon by ID      |
| POST   | `/`         | ✅ Admin      | Create coupon         |
| PUT    | `/:id`      | ✅ Admin      | Update coupon         |
| DELETE | `/:id`      | ✅ Admin      | Delete coupon         |

---

## 4. Offer Routes (7 endpoints)

**Base URL:** `/api/offers`

| Method | Endpoint        | Auth Required | Description                      |
| ------ | --------------- | ------------- | -------------------------------- |
| GET    | `/active-popup` | ❌ Public     | Get active popup offer           |
| GET    | `/`             | ✅ Admin      | Get all offers                   |
| GET    | `/:id`          | ✅ Admin      | Get offer by ID                  |
| POST   | `/`             | ✅ Admin      | Create offer (with image upload) |
| PUT    | `/:id`          | ✅ Admin      | Update offer (with image upload) |
| DELETE | `/:id`          | ✅ Admin      | Delete offer                     |
| PATCH  | `/:id/toggle`   | ✅ Admin      | Toggle offer status              |

---

## 5. Order Routes (4 endpoints)

**Base URL:** `/api/orders`

| Method | Endpoint      | Auth Required | Description         |
| ------ | ------------- | ------------- | ------------------- |
| GET    | `/`           | ✅ Admin      | Get all orders      |
| GET    | `/my-orders`  | ✅ User       | Get user's orders   |
| POST   | `/`           | ✅ User       | Create new order    |
| PATCH  | `/:id/status` | ✅ Admin      | Update order status |

---

## 6. Payment Routes (13 endpoints)

**Base URL:** `/api/payments`

| Method | Endpoint           | Auth Required | Description                    |
| ------ | ------------------ | ------------- | ------------------------------ |
| POST   | `/webhooks/stripe` | ❌ Webhook    | Stripe webhook handler         |
| POST   | `/webhooks/bkash`  | ❌ Webhook    | bKash webhook handler          |
| POST   | `/webhooks/nagad`  | ❌ Webhook    | Nagad webhook handler          |
| GET    | `/my-payments`     | ✅ User       | Get user's payments            |
| GET    | `/order/:orderId`  | ✅ User       | Get payment for specific order |
| GET    | `/:id`             | ✅ User       | Get payment by ID              |
| POST   | `/process`         | ✅ User       | Process payment                |
| GET    | `/`                | ✅ Admin      | Get all payments               |
| GET    | `/stats`           | ✅ Admin      | Get payment statistics         |
| PATCH  | `/:id/status`      | ✅ Admin      | Update payment status          |
| POST   | `/:id/refund`      | ✅ Admin      | Process refund                 |

---

## 7. Product Routes (11 endpoints)

**Base URL:** `/api/products`

| Method | Endpoint              | Auth Required | Description                     |
| ------ | --------------------- | ------------- | ------------------------------- |
| GET    | `/`                   | ❌ Public     | Get all products (with filters) |
| GET    | `/search`             | ❌ Public     | Search products                 |
| GET    | `/filter-options`     | ❌ Public     | Get filter options              |
| GET    | `/:id`                | ❌ Public     | Get product by ID               |
| GET    | `/admin/low-stock`    | ✅ Admin      | Get low stock products          |
| GET    | `/admin/out-of-stock` | ✅ Admin      | Get out of stock products       |
| POST   | `/`                   | ✅ Admin      | Create product                  |
| PUT    | `/:id`                | ✅ Admin      | Update product                  |
| DELETE | `/:id`                | ✅ Admin      | Delete product                  |
| PATCH  | `/bulk-stock-update`  | ✅ Admin      | Bulk update stock               |

---

## 8. Return Routes (10 endpoints)

**Base URL:** `/api/returns`

| Method | Endpoint          | Auth Required | Description                    |
| ------ | ----------------- | ------------- | ------------------------------ |
| GET    | `/test`           | ❌ Public     | Test route (debugging)         |
| POST   | `/test`           | ❌ Public     | Test POST route (debugging)    |
| GET    | `/my-returns`     | ✅ User       | Get user's returns             |
| GET    | `/order/:orderId` | ✅ User       | Get returns for specific order |
| GET    | `/:id`            | ✅ User       | Get return by ID               |
| POST   | `/`               | ✅ User       | Create return request          |
| GET    | `/`               | ✅ Admin      | Get all returns                |
| GET    | `/stats`          | ✅ Admin      | Get return statistics          |
| PATCH  | `/:id/status`     | ✅ Admin      | Update return status           |
| POST   | `/:id/refund`     | ✅ Admin      | Process refund for return      |

---

## 9. Review Routes (6 endpoints)

**Base URL:** `/api/reviews`

| Method | Endpoint              | Auth Required | Description               |
| ------ | --------------------- | ------------- | ------------------------- |
| GET    | `/product/:productId` | ❌ Public     | Get reviews for a product |
| POST   | `/:reviewId/helpful`  | ❌ Public     | Mark review as helpful    |
| POST   | `/`                   | ✅ User       | Create new review         |
| GET    | `/my-reviews`         | ✅ User       | Get user's reviews        |
| PUT    | `/:reviewId`          | ✅ User       | Update review             |
| DELETE | `/:reviewId`          | ✅ User       | Delete review             |

---

## 10. User Routes (1 endpoint)

**Base URL:** `/api/users`

| Method | Endpoint | Auth Required | Description                |
| ------ | -------- | ------------- | -------------------------- |
| GET    | `/me`    | ✅ User       | Get or create user profile |

---

## 11. Wishlist Routes (4 endpoints)

**Base URL:** `/api/wishlist`

| Method | Endpoint      | Auth Required | Description                  |
| ------ | ------------- | ------------- | ---------------------------- |
| GET    | `/`           | ✅ User       | Get user's wishlist          |
| POST   | `/`           | ✅ User       | Add product to wishlist      |
| DELETE | `/:productId` | ✅ User       | Remove product from wishlist |
| DELETE | `/`           | ✅ User       | Clear entire wishlist        |

---

## Summary by Category

| Category   | Total Endpoints | Public | User Auth | Admin Auth |
| ---------- | --------------- | ------ | --------- | ---------- |
| Addresses  | 8               | 0      | 8         | 0          |
| Categories | 5               | 2      | 0         | 3          |
| Coupons    | 8               | 2      | 1         | 5          |
| Offers     | 7               | 1      | 0         | 6          |
| Orders     | 4               | 0      | 2         | 2          |
| Payments   | 13              | 3      | 4         | 6          |
| Products   | 11              | 4      | 0         | 7          |
| Returns    | 10              | 2      | 4         | 4          |
| Reviews    | 6               | 2      | 4         | 0          |
| Users      | 1               | 0      | 1         | 0          |
| Wishlist   | 4               | 0      | 4         | 0          |
| **TOTAL**  | **78**          | **16** | **28**    | **33**     |

---

## Authentication Breakdown

### Public Endpoints (16)

No authentication required - accessible to everyone

### User Endpoints (28)

Requires user authentication (Firebase JWT token)

### Admin Endpoints (33)

Requires admin authentication (Firebase JWT + admin role)

### Webhook Endpoints (3)

Special endpoints for payment gateway webhooks

---

## HTTP Methods Used

| Method | Count | Usage                          |
| ------ | ----- | ------------------------------ |
| GET    | 38    | Retrieve data                  |
| POST   | 20    | Create data / Process actions  |
| PUT    | 4     | Update data (full replacement) |
| PATCH  | 6     | Update data (partial)          |
| DELETE | 10    | Delete data                    |

---

## Special Features

### File Upload Endpoints

- `POST /api/offers` - Image upload for offers (Multer)
- `PUT /api/offers/:id` - Image upload for offer updates

### Webhook Endpoints

- `POST /api/payments/webhooks/stripe` - Stripe payment webhook
- `POST /api/payments/webhooks/bkash` - bKash payment webhook
- `POST /api/payments/webhooks/nagad` - Nagad payment webhook

### Bulk Operations

- `PATCH /api/products/bulk-stock-update` - Update multiple product stocks

### Statistics Endpoints

- `GET /api/payments/stats` - Payment statistics
- `GET /api/returns/stats` - Return statistics

---

## Authentication Middleware

### verifyToken

- Verifies Firebase JWT token
- Extracts user information
- Used for all authenticated routes

### verifyAdmin

- Checks if user has admin role
- Used for admin-only routes
- Requires verifyToken first

---

## Common Query Parameters

### Products

- `category` - Filter by category
- `minPrice` / `maxPrice` - Price range
- `search` - Search query
- `page` / `limit` - Pagination

### Orders

- `status` - Filter by order status
- `userId` - Filter by user (admin only)

### Reviews

- `page` / `limit` - Pagination
- `productId` - Filter by product

---

## Response Format

All endpoints follow a consistent response format:

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message"
}
```

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding for:

- Login/Registration endpoints
- Review creation
- Order creation
- Payment processing

---

## CORS Configuration

CORS is enabled for all routes to allow frontend access from different origins.

---

## File Upload Limits

### Offers

- Max file size: 5MB
- Allowed formats: JPEG, JPG, PNG, GIF, WebP
- Storage: Local filesystem (`uploads/` directory)

---

## Database Collections

The API interacts with these MongoDB collections:

1. users
2. products
3. categories
4. orders
5. payments
6. addresses
7. coupons
8. offers (Mongoose)
9. returns
10. reviews
11. wishlists

---

## Environment Variables Required

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

---

## Testing Endpoints

Use tools like:

- Postman
- Thunder Client (VS Code)
- cURL
- Insomnia

Example:

```bash
# Get all products
curl http://localhost:5000/api/products

# Create order (with auth)
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"products": [...], "total": 100}'
```

---

## Future Enhancements

Consider adding:

- [ ] Rate limiting
- [ ] API versioning (v1, v2)
- [ ] GraphQL endpoint
- [ ] WebSocket for real-time updates
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Request validation middleware
- [ ] Response caching
- [ ] API analytics

---

**Total: 78 API Endpoints** serving a complete e-commerce platform! 🚀
