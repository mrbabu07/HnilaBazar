# 🎯 How to Create Promotional Offers - Quick Guide

## Where to Find the Offers Section

### Option 1: From Admin Dashboard (Recommended)

1. **Login as Admin** to your application
2. **Navigate to Admin Dashboard** at `/admin`
3. Look for **"Quick Actions"** section on the left side
4. Click on **"Manage Offers"** (pink icon with gift box)
5. You'll be taken to the Offers management page

### Option 2: Direct URL

Simply navigate to: **`http://localhost:5173/admin/offers`**

---

## Step-by-Step: Creating Your First Offer

### 1. Access the Offers Page

- Go to Admin Dashboard → Click "Manage Offers"
- OR directly visit `/admin/offers`

### 2. Click "Create Offer" Button

- You'll see a green button in the top-right corner
- Click it to open the offer creation form

### 3. Fill in the Form

#### **Basic Information**

- **Title** (Required): e.g., "Summer Sale 2024"
- **Description** (Required): Describe your offer in detail
- **Discount Type**: Choose "Percentage (%)" or "Fixed Amount ($)"
- **Discount Value** (Required): Enter the discount amount (e.g., 20 for 20% off)
- **Coupon Code** (Optional): e.g., "SUMMER2024" (auto-converts to uppercase)

#### **Offer Image**

- **Upload Image** (Required): Click to select an image
  - Max size: 5MB
  - Formats: JPEG, PNG, GIF, WebP
  - You'll see a preview after selecting

#### **Validity Period**

- **Start Date & Time** (Required): When the offer becomes active
- **End Date & Time** (Required): When the offer expires

#### **Settings**

- **Priority Level**: Higher numbers show first (default: 0)
- **Button Text**: Customize the CTA button (default: "Shop Now")
- **Button Link**: Where the button redirects (default: "/products")
- **Active**: Check to make offer active immediately
- **Show as Popup**: Check to display as popup modal to users

#### **Target Products** (Optional)

- Select specific products for this offer
- Leave empty to apply to all products

### 4. Click "Create Offer"

- The offer will be saved
- You'll be redirected back to the offers list
- Success message will appear

---

## Managing Existing Offers

### View All Offers

- Go to `/admin/offers`
- See all offers with images, status, and details

### Edit an Offer

- Click the blue **"Edit"** button on any offer
- Modify any fields
- Click **"Update Offer"**

### Toggle Active/Inactive

- Click the **"Activate"** or **"Deactivate"** button
- Instantly enables or disables the offer

### Delete an Offer

- Click the red **"Delete"** button
- Confirm deletion in the modal
- Offer and its image will be permanently removed

---

## How Users See the Offer

### Automatic Popup Display

1. User visits any page on your website
2. After **2 seconds**, the popup appears automatically
3. Shows the **highest priority active offer** within its date range
4. Displays:
   - Offer image
   - Title and description
   - Discount badge
   - Coupon code (with copy button)
   - Validity period
   - "Shop Now" button

### Session Control

- Popup shows **once per browser session**
- After user closes it, won't show again until they restart browser
- This prevents annoying repeated popups

---

## Quick Navigation Map

```
Your App
└── Admin Dashboard (/admin)
    └── Quick Actions Section
        └── Manage Offers (Click here!)
            ├── Offers List (/admin/offers)
            │   ├── Create Offer Button → Form (/admin/offers/add)
            │   ├── Edit Button → Form (/admin/offers/edit/:id)
            │   ├── Activate/Deactivate Button
            │   └── Delete Button
            └── Offer Form
                ├── Basic Information
                ├── Image Upload
                ├── Date Range
                ├── Settings
                └── Target Products
```

---

## Example: Creating a "50% Off Summer Sale"

1. **Go to**: `/admin/offers`
2. **Click**: "Create Offer" button
3. **Fill in**:
   - Title: `Summer Sale - 50% Off Everything!`
   - Description: `Get 50% off all products this summer. Limited time only!`
   - Discount Type: `Percentage (%)`
   - Discount Value: `50`
   - Coupon Code: `SUMMER50`
   - Upload a summer-themed image
   - Start Date: `2024-06-01 00:00`
   - End Date: `2024-08-31 23:59`
   - Priority: `10`
   - Check ✅ Active
   - Check ✅ Show as Popup
4. **Click**: "Create Offer"
5. **Done!** Users will now see this popup when they visit your site

---

## Troubleshooting

### "I don't see the Manage Offers link"

- Make sure you're logged in as an **admin user**
- Check that you're on the Admin Dashboard page (`/admin`)
- Look in the "Quick Actions" section (left side)

### "The popup doesn't appear"

- Check that the offer is **Active** (green badge)
- Verify the **date range** includes today
- Make sure **"Show as Popup"** is checked
- Clear your browser's session storage and refresh
- Check browser console for errors

### "Image upload fails"

- Ensure image is under **5MB**
- Use supported formats: JPEG, PNG, GIF, WebP
- Check that the `uploads/` folder exists on the server

### "Can't access /admin/offers"

- Verify you're logged in as admin
- Check that offer routes are registered in the server
- Ensure the backend is running on port 5000

---

## Visual Guide

### Admin Dashboard - Quick Actions

```
┌─────────────────────────────────┐
│  Quick Actions                  │
├─────────────────────────────────┤
│  📦 Manage Products             │
│  🏷️  Manage Categories          │
│  📋 View Orders                 │
│  🎟️  Manage Coupons             │
│  ↩️  Manage Returns             │
│  🎁 Manage Offers  ← CLICK HERE │
└─────────────────────────────────┘
```

### Offers List Page

```
┌──────────────────────────────────────────┐
│  Promotional Offers    [+ Create Offer]  │
├──────────────────────────────────────────┤
│  ┌────────────────────────────────────┐  │
│  │ [Image] Summer Sale 2024           │  │
│  │         50% OFF | Priority: 10     │  │
│  │         [Edit] [Toggle] [Delete]   │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

---

## That's It! 🎉

You can now:
✅ Find the offers section in the admin dashboard
✅ Create promotional offers with images
✅ Set date ranges and priorities
✅ Add coupon codes
✅ Users will see beautiful popups automatically

**Start creating your first offer now!**
Navigate to: **Admin Dashboard → Manage Offers → Create Offer**
