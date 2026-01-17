const { ObjectId } = require("mongodb");

class Product {
  constructor(db) {
    this.collection = db.collection("products");
  }

  async findAll(filter = {}) {
    return await this.collection.find(filter).toArray();
  }

  async findById(id) {
    try {
      // Validate ObjectId format
      if (!id || typeof id !== "string" || id.length !== 24) {
        return null;
      }
      return await this.collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      // Handle invalid ObjectId format
      console.error("Invalid ObjectId format:", id, error.message);
      return null;
    }
  }

  async findByCategory(categoryId) {
    return await this.collection.find({ categoryId }).toArray();
  }

  async create(productData) {
    const result = await this.collection.insertOne({
      ...productData,
      createdAt: new Date(),
    });
    return result.insertedId;
  }

  async update(id, productData) {
    return await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...productData, updatedAt: new Date() } },
    );
  }

  async delete(id) {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  async updateStock(id, quantity) {
    return await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { stock: -quantity } },
    );
  }
}

module.exports = Product;
