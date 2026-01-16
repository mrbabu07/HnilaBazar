const { ObjectId } = require("mongodb");

class Category {
  constructor(db) {
    this.collection = db.collection("categories");
  }

  async findAll() {
    return await this.collection.find({}).toArray();
  }

  async findById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findBySlug(slug) {
    return await this.collection.findOne({ slug });
  }

  async create(categoryData) {
    const result = await this.collection.insertOne({
      ...categoryData,
      createdAt: new Date(),
    });
    return result.insertedId;
  }

  async update(id, categoryData) {
    return await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...categoryData, updatedAt: new Date() } }
    );
  }

  async delete(id) {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Category;
