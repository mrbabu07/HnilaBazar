const { ObjectId } = require("mongodb");

class Wishlist {
  constructor(db) {
    this.collection = db.collection("wishlists");
  }

  async findByUserId(userId) {
    return await this.collection.findOne({ userId });
  }

  async addProduct(userId, productId) {
    const existingWishlist = await this.findByUserId(userId);

    if (existingWishlist) {
      // Check if product already in wishlist
      if (existingWishlist.products.some((p) => p.toString() === productId)) {
        return { success: false, message: "Product already in wishlist" };
      }

      // Add product to existing wishlist
      await this.collection.updateOne(
        { userId },
        {
          $push: { products: new ObjectId(productId) },
          $set: { updatedAt: new Date() },
        },
      );
    } else {
      // Create new wishlist
      await this.collection.insertOne({
        userId,
        products: [new ObjectId(productId)],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return { success: true, message: "Product added to wishlist" };
  }

  async removeProduct(userId, productId) {
    const result = await this.collection.updateOne(
      { userId },
      {
        $pull: { products: new ObjectId(productId) },
        $set: { updatedAt: new Date() },
      },
    );

    return result.modifiedCount > 0;
  }

  async getWishlistWithProducts(userId) {
    const pipeline = [
      { $match: { userId } },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "productDetails",
        },
      },
    ];

    const result = await this.collection.aggregate(pipeline).toArray();
    return result[0] || { products: [], productDetails: [] };
  }

  async clearWishlist(userId) {
    return await this.collection.deleteOne({ userId });
  }
}

module.exports = Wishlist;
