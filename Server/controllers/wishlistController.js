const addToWishlist = async (req, res) => {
  try {
    const Wishlist = req.app.locals.models.Wishlist;
    const { productId } = req.body;
    const userId = req.user.uid;

    if (!productId) {
      return res.status(400).json({
        success: false,
        error: "Product ID is required",
      });
    }

    const result = await Wishlist.addProduct(userId, productId);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.message,
      });
    }

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const Wishlist = req.app.locals.models.Wishlist;
    const { productId } = req.params;
    const userId = req.user.uid;

    const success = await Wishlist.removeProduct(userId, productId);

    if (!success) {
      return res.status(404).json({
        success: false,
        error: "Product not found in wishlist",
      });
    }

    res.json({
      success: true,
      message: "Product removed from wishlist",
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const Wishlist = req.app.locals.models.Wishlist;
    const userId = req.user.uid;

    const wishlist = await Wishlist.getWishlistWithProducts(userId);

    res.json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const clearWishlist = async (req, res) => {
  try {
    const Wishlist = req.app.locals.models.Wishlist;
    const userId = req.user.uid;

    await Wishlist.clearWishlist(userId);

    res.json({
      success: true,
      message: "Wishlist cleared",
    });
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  clearWishlist,
};
