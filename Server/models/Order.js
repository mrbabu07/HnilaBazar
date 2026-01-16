const { ObjectId } = require("mongodb");

class Order {
  constructor(db) {
    this.collection = db.collection("orders");
  }

  async findAll() {
    return await this.collection.find({}).sort({ createdAt: -1 }).toArray();
  }

  async findById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findByUserId(userId) {
    return await this.collection
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();
  }

  async create(orderData) {
    const result = await this.collection.insertOne({
      ...orderData,
      status: "pending",
      createdAt: new Date(),
    });
    return result.insertedId;
  }

  async updateStatus(id, status) {
    return await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );
  }
}

module.exports = Order;
