const { ObjectId } = require("mongodb");

class User {
  constructor(db) {
    this.collection = db.collection("users");
  }

  async findByFirebaseUid(firebaseUid) {
    return await this.collection.findOne({ firebaseUid });
  }

  async findById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async create(userData) {
    const result = await this.collection.insertOne({
      ...userData,
      createdAt: new Date(),
    });
    return result.insertedId;
  }

  async updateRole(firebaseUid, role) {
    return await this.collection.updateOne({ firebaseUid }, { $set: { role } });
  }
}

module.exports = User;
