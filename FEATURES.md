# 📚 HnilaBazar - Feature Documentation

Complete guide to all features in the HnilaBazar e-commerce platform.

## Table of Contents

- [Flash Sales](#flash-sales)
- [Customer Insights](#customer-insights)
- [Live Chat](#live-chat)
- [Product Comparison](#product-comparison)
- [Reviews & Ratings](#reviews--ratings)
- [Wishlist](#wishlist)
- [Multi-language Support](#multi-language-support)

---

## ⚡ Flash Sales

### Overview

Time-limited deals with countdown timers and stock tracking to create urgency and drive conversions.

### Features

- Live countdown timers (days, hours, minutes, seconds)
- Real-time stock tracking with progress bars
- Automatic status updates (upcoming → active → expired)
- Admin management panel
- Homepage banner with auto-rotation
- Purchase limits per user

### URLs

- **Public Page**: `/flash-sales`
- **Admin Panel**: `/admin/flash-sales`

### API Endpoints

```
GET    /api/flash-sales/active      # Get active sales
GET    /api/flash-sales/upcoming    # Get upcoming sales
GET    /api/flash-sales/:id         # Get single sale
POST   /api/flash-sales             # Create (admin)
PUT    /api/flash-sales/:id         # Update (admin)
DELETE /api/flash-sales/:id         # Delete (admin)
```

### Quick Start

```bash
# Add sample flash sales
cd Server
npm run seed:flash

# Check status
npm run check:flash

# Test API
npm run test:flash
```

### Admin Usage

1. Login as admin
2. Navigate to Admin → Flash Sales
3. Click "Create Flash Sale"
4. Fill in:
   - Title and description
   - Select product
   - Set flash price
   - Choose start/end times
   - Set stock limits
5. Save and watch it go live!

### Customer Experience

- See banner on homepage
- Click "⚡ Flash Sales" in navbar
- View countdown timers
- Watch stock deplete in real-time
- Quick add to cart

---

## 📊 Customer Insights

### Overview

Comprehensive analytics system that tracks customer behavior, preferences, and purchasing patterns.

### Features

- Customer segmentation (New, Regular, VIP)
- Purchase analytics and metrics
- Favorite categories and brands tracking
- Order history analysis
- Support ticket history
- Automatic insight generation

### Customer Segments

- **New**: 1-2 orders, first-time buyers
- **Regular**: 3-10 orders, consistent purchases
- **VIP**: 10+ orders or $5000+ spent

### Metrics Tracked

- Total spent
- Average order value
- Order frequency (orders/month)
- Customer lifetime value
- Favorite categories
- Favorite brands
- Price range preferences
- Last order date

### URLs

- **Admin Panel**: `/admin/insights`

### API Endpoints

```
GET  /api/admin/insights              # Get all insights
GET  /api/admin/insights/segments     # Get segment stats
GET  /api/admin/insights/:userId      # Get single insight
POST /api/admin/insights/:userId/generate  # Generate insight
```

### Admin Usage

1. Navigate to Admin → Customer Insights
2. View segment statistics dashboard
3. Filter by segment (New/Regular/VIP)
4. Click "Eye" icon to view detailed analytics
5. Click "Refresh" to regenerate insights

### Use Cases

- Identify VIP customers for special offers
- Re-engage regular customers
- Convert new customers with welcome discounts
- Analyze preferences for inventory planning
- Improve customer support

---

## 💬 Live Chat

### Overview

Real-time customer support using Tawk.to integration.

### Features

- Live chat widget on all pages
- User identification when logged in
- Theme support (light/dark mode)
- Mobile responsive
- Chat history
- Offline messages

### Location

- Widget appears in bottom-right corner on all pages

### Configuration

- **Provider**: Tawk.to
- **Dashboard**: https://dashboard.tawk.to
- **Property ID**: `696e36eb9706f219819111c7`

### Features Available

- Real-time messaging
- Visitor monitoring
- Automated responses
- Business hours settings
- Email notifications
- Mobile app for agents
- Chat transcripts

### Testing

1. Open any page
2. Look for chat bubble in bottom-right
3. Click to open chat window
4. Type a message
5. Respond via Tawk.to dashboard

### Customization

Login to Tawk.to dashboard to:

- Change widget colors
- Set business hours
- Create automated responses
- View analytics
- Manage agents

---

## 🔄 Product Comparison

### Overview

Compare up to 4 products side-by-side to help customers make informed decisions.

### Features

- Compare up to 4 products
- Side-by-side comparison table
- Floating comparison button
- Persistent across sessions
- Quick add/remove products

### URLs

- **Comparison Page**: `/compare`

### How to Use

1. Browse products
2. Click "Compare" button on product cards
3. Floating button shows comparison count
4. Click floating button to view comparison
5. See all specs side-by-side
6. Remove products or clear all

### Comparison Includes

- Product images
- Prices
- Ratings
- Descriptions
- Specifications
- Stock status
- Add to cart buttons

---

## ⭐ Reviews & Ratings

### Overview

Customer review system with star ratings and verified purchase badges.

### Features

- 5-star rating system
- Written reviews
- Verified purchase badges
- Helpful votes
- Review images
- Admin moderation

### Customer Features

- Rate products (1-5 stars)
- Write detailed reviews
- Upload review images
- Vote reviews as helpful
- Edit own reviews

### Admin Features

- View all reviews
- Moderate reviews
- Respond to reviews
- Delete inappropriate reviews
- View review analytics

### URLs

- **Product Reviews**: On product detail pages
- **Admin Panel**: `/admin/reviews`

---

## ❤️ Wishlist

### Overview

Save favorite products for later purchase.

### Features

- Add/remove products
- Persistent across sessions
- Quick add to cart
- Stock notifications
- Price drop alerts

### URLs

- **Wishlist Page**: `/wishlist`

### API Endpoints

```
GET    /api/wishlist           # Get user wishlist
POST   /api/wishlist           # Add to wishlist
DELETE /api/wishlist/:id       # Remove from wishlist
```

---

## 🌐 Multi-language Support

### Overview

Support for multiple languages using i18next.

### Supported Languages

- English (en)
- Bengali (bn)
- Hindi (hi)

### Features

- Language switcher in navbar
- Persistent language preference
- RTL support ready
- Easy to add new languages

### Adding New Language

1. Create translation file: `Client/src/i18n/locales/[lang].json`
2. Add translations for all keys
3. Import in `Client/src/i18n/i18n.js`
4. Add to language switcher

### Translation Files

```
Client/src/i18n/locales/
├── en.json  # English
├── bn.json  # Bengali
└── hi.json  # Hindi
```

---

## 🎯 Additional Features

### PWA (Progressive Web App)

- Install as mobile app
- Offline support
- Push notifications
- Service worker caching

### Dark Mode

- Toggle between light/dark themes
- Persistent preference
- System preference detection

### Notifications

- Real-time order updates
- Stock alerts
- Price drop notifications
- Promotional offers

### Payment Methods

- Credit/Debit cards
- UPI
- Cash on Delivery
- Wallet integration

### Order Management

- Order tracking
- Status updates
- Invoice generation
- Return requests

### Coupons & Offers

- Discount codes
- Percentage/fixed discounts
- Minimum order requirements
- Usage limits
- Expiration dates

---

## 🚀 Coming Soon

- Social media login (Facebook, Twitter)
- Product recommendations AI
- Loyalty rewards program
- Gift cards
- Subscription products
- Multi-vendor support
- Advanced analytics
- Email marketing integration

---

For technical documentation, see [README.md](README.md)
