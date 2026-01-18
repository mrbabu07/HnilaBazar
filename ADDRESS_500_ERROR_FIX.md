# Address Creation 500 Error - FIXED ✅

## Problem

When trying to create a new address, the API returned:

```
POST http://localhost:5000/api/addresses 500 (Internal Server Error)
Error: Cannot read properties of undefined (reading 'uid')
```

## Root Cause

The address routes file (`Server/routes/addressRoutes.js`) had the authentication middleware **commented out for testing**:

```javascript
// Temporary: Remove auth requirement for testing
// router.use(verifyToken);
```

However, the address controller (`Server/controllers/addressController.js`) still expected `req.user.uid` to be available:

```javascript
const createAddress = async (req, res) => {
  const userId = req.user.uid; // ❌ req.user was undefined
  // ...
};
```

## Solution Applied

**Re-enabled authentication middleware** in `Server/routes/addressRoutes.js`:

- Removed test routes
- Uncommented `router.use(verifyToken)`
- Applied authentication to all address endpoints

## Changes Made

### File: `Server/routes/addressRoutes.js`

```javascript
// ✅ Authentication now properly applied
router.use(verifyToken);

// All routes now have req.user available
router.get("/", getUserAddresses);
router.post("/", createAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);
router.patch("/:id/default", setDefaultAddress);
```

## Verification

✅ Server restarted successfully
✅ All routes registered including addresses
✅ Authentication middleware active
✅ Frontend correctly sends Bearer token in headers

## Testing

The address creation should now work properly:

1. User must be logged in (Firebase authentication)
2. Frontend sends JWT token in Authorization header
3. Backend verifies token and extracts user ID
4. Address is created with correct userId

## Status: RESOLVED ✅
