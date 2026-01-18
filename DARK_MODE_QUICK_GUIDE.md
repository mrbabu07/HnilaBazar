# Dark Mode Quick Implementation Guide

## ✅ What's Already Done

1. **ThemeContext** - Theme state management ✅
2. **ThemeToggle** - Toggle button in navbar ✅
3. **Tailwind Config** - `darkMode: "class"` enabled ✅
4. **Navbar** - Dark mode classes added ✅

## 🎨 How Dark Mode Works

When you click the theme toggle:

1. ThemeContext changes `theme` state to "dark"
2. `document.documentElement` gets class "dark" added
3. All `dark:` classes in Tailwind become active

## 📝 Quick Reference: Common Dark Mode Classes

### Backgrounds

```javascript
bg-white dark:bg-gray-900          // Main backgrounds
bg-gray-50 dark:bg-gray-800        // Secondary backgrounds
bg-gray-100 dark:bg-gray-700       // Tertiary backgrounds
```

### Text

```javascript
text-gray-900 dark:text-white      // Primary text
text-gray-700 dark:text-gray-300   // Secondary text
text-gray-500 dark:text-gray-400   // Tertiary text
```

### Borders

```javascript
border-gray-200 dark:border-gray-700   // Light borders
border-gray-300 dark:border-gray-600   // Medium borders
```

### Hover States

```javascript
hover:bg-gray-100 dark:hover:bg-gray-800
hover:text-gray-900 dark:hover:text-white
```

## 🚀 Quick Implementation Steps

### Step 1: Add to Main Layout Components

#### Example: Card Component

```javascript
// Before
<div className="bg-white rounded-xl shadow-sm border p-6">
  <h2 className="text-gray-900 font-bold">Title</h2>
  <p className="text-gray-600">Description</p>
</div>

// After (with dark mode)
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
  <h2 className="text-gray-900 dark:text-white font-bold">Title</h2>
  <p className="text-gray-600 dark:text-gray-300">Description</p>
</div>
```

#### Example: Input Field

```javascript
// Before
<input
  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
  placeholder="Enter text"
/>

// After (with dark mode)
<input
  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
  placeholder="Enter text"
/>
```

#### Example: Button

```javascript
// Before
<button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
  Click me
</button>

// After (with dark mode)
<button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
  Click me
</button>
```

### Step 2: Priority Components to Update

Update these components first for maximum impact:

1. **Home.jsx** - Main landing page
2. **ProductCard.jsx** - Product listings
3. **Footer.jsx** - Footer section
4. **Cart.jsx** - Shopping cart
5. **Checkout.jsx** - Checkout page

### Step 3: Pattern to Follow

For each component, update:

1. Main container backgrounds
2. Text colors
3. Border colors
4. Hover states
5. Input fields
6. Buttons

## 📦 Component-by-Component Guide

### Home.jsx

```javascript
// Main container
<div className="min-h-screen bg-gray-50 dark:bg-gray-900">

// Hero section
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
    Welcome to HnilaBazar
  </h1>
  <p className="text-gray-600 dark:text-gray-300">
    Your shopping destination
  </p>
</div>
```

### ProductCard.jsx

```javascript
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
  <img
    src={image}
    alt={title}
    className="w-full h-48 object-cover rounded-t-xl"
  />
  <div className="p-4">
    <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    <div className="flex items-center justify-between mt-4">
      <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
        ${price}
      </span>
      <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg">
        Add to Cart
      </button>
    </div>
  </div>
</div>
```

### Footer.jsx

```javascript
<footer className="bg-gray-900 dark:bg-black text-white">
  <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="font-bold text-lg mb-4">About Us</h3>
        <p className="text-gray-400 dark:text-gray-500">
          Your trusted shopping destination
        </p>
      </div>
      {/* More sections */}
    </div>
  </div>
</footer>
```

### Cart.jsx

```javascript
<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
  <div className="max-w-7xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
      Shopping Cart
    </h1>

    {/* Cart items */}
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Cart content */}
    </div>
  </div>
</div>
```

## 🎯 Testing Dark Mode

### Test Checklist

- [ ] Click theme toggle in navbar
- [ ] Icon changes (moon ↔ sun)
- [ ] Page background changes
- [ ] Text is readable in both modes
- [ ] Borders are visible in both modes
- [ ] Buttons look good in both modes
- [ ] Input fields are usable in both modes
- [ ] Images have proper contrast
- [ ] Refresh page - theme persists

### Common Issues & Fixes

**Issue: Text not visible in dark mode**

```javascript
// Fix: Add dark text color
className = "text-gray-900 dark:text-white";
```

**Issue: Borders disappear in dark mode**

```javascript
// Fix: Add dark border color
className = "border-gray-200 dark:border-gray-700";
```

**Issue: Background too bright in dark mode**

```javascript
// Fix: Use darker background
className = "bg-white dark:bg-gray-800"; // or dark:bg-gray-900
```

## 🔧 Automated Approach (Optional)

If you want to add dark mode to many components quickly, you can use find & replace:

### Find & Replace Patterns

1. **Backgrounds**
   - Find: `bg-white`
   - Replace: `bg-white dark:bg-gray-800`

2. **Text**
   - Find: `text-gray-900`
   - Replace: `text-gray-900 dark:text-white`
   - Find: `text-gray-700`
   - Replace: `text-gray-700 dark:text-gray-300`

3. **Borders**
   - Find: `border-gray-200`
   - Replace: `border-gray-200 dark:border-gray-700`

**⚠️ Warning:** Review each change manually to ensure it looks good!

## 📱 Mobile Dark Mode

Dark mode classes work the same on mobile. Just ensure:

- Text is readable on small screens
- Touch targets are visible
- Contrast is sufficient

## 🎨 Color Scheme

### Light Mode

- Background: White, Gray-50, Gray-100
- Text: Gray-900, Gray-700, Gray-600
- Borders: Gray-200, Gray-300
- Primary: Primary-500, Primary-600

### Dark Mode

- Background: Gray-900, Gray-800, Gray-700
- Text: White, Gray-200, Gray-300
- Borders: Gray-700, Gray-600
- Primary: Primary-600, Primary-400

## ✅ Summary

**What Works Now:**

- ✅ Theme toggle in navbar
- ✅ Theme persists in localStorage
- ✅ Navbar has dark mode
- ✅ Foundation is ready

**What to Do:**

1. Add `dark:` classes to components
2. Test in both light and dark mode
3. Ensure text is readable
4. Check borders are visible
5. Verify buttons look good

**Quick Pattern:**

```javascript
// Every component should follow this pattern:
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
  {/* Content */}
</div>
```

The dark mode system is fully functional - you just need to add the `dark:` classes to your components!
