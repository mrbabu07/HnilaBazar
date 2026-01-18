const { ObjectId } = require("mongodb");

class Review {
  constructor(db) {
    this.collection = db.collection("reviews");
  }

  async create(reviewData) {
    const review = {
      ...reviewData,
      productId: new ObjectId(reviewData.productId),
      userId: reviewData.userId,
      rating: parseInt(reviewData.rating),
      createdAt: new Date(),
      updatedAt: new Date(),
      helpful: 0,
      verified: false, // Will be set to true if user purchased the product
    };

    const result = await this.collection.insertOne(review);
    return result.insertedId;
  }

  async findByProductId(productId, limit = 10, skip = 0) {
    return await this.collection
      .find({ productId: new ObjectId(productId) })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .toArray();
  }

  async findByUserId(userId) {
    return await this.collection
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();
  }

  async getProductRatingStats(productId) {
    const pipeline = [
      { $match: { productId: new ObjectId(productId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: "$rating",
          },
        },
      },
    ];

    const result = await this.collection.aggregate(pipeline).toArray();

    if (result.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };
    }

    const stats = result[0];
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    stats.ratingDistribution.forEach((rating) => {
      distribution[rating]++;
    });

    return {
      averageRating: Math.round(stats.averageRating * 10) / 10,
      totalReviews: stats.totalReviews,
      ratingDistribution: distribution,
    };
  }

  async update(reviewId, updateData) {
    return await this.collection.updateOne(
      { _id: new ObjectId(reviewId) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
    );
  }

  async delete(reviewId) {
    return await this.collection.deleteOne({ _id: new ObjectId(reviewId) });
  }

  async markHelpful(reviewId) {
    return await this.collection.updateOne(
      { _id: new ObjectId(reviewId) },
      { $inc: { helpful: 1 } },
    );
  }

  async verifyPurchase(userId, productId) {
    // Check if user has purchased this product
    const db = this.collection.db;
    const orders = await db
      .collection("orders")
      .find({
        userId,
        "items.productId": new ObjectId(productId),
        status: { $in: ["delivered", "completed"] },
      })
      .toArray();

    return orders.length > 0;
  }
}

module.exports = Review;
