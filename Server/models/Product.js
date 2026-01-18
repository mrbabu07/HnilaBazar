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
    try {
      // Enhanced logging for debugging
      console.log("🔧 Product Model Update:");
      console.log("- ID:", id);
      console.log("- Data Keys:", Object.keys(productData));

      // Validate ObjectId
      if (!id || typeof id !== "string" || id.length !== 24) {
        throw new Error(`Invalid ObjectId format: ${id}`);
      }

      // Create ObjectId
      const objectId = new ObjectId(id);
      console.log("- ObjectId created:", objectId);

      // Prepare update data
      const updateData = {
        ...productData,
        updatedAt: new Date(),
      };

      console.log("- Update operation starting...");

      const result = await this.collection.updateOne(
        { _id: objectId },
        { $set: updateData },
      );

      console.log("- Update result:", result);
      return result;
    } catch (error) {
      console.error("💥 Product Model Update Error:", error);
      throw error;
    }
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
