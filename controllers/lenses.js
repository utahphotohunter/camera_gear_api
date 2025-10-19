const mongoDb = require("../database/connection");
const ObjectId = require("mongodb").ObjectId;

// ==============================================
// GET logic
// ==============================================
const getAll = async (req, res, next) => {
  const result = mongoDb
    .getDb()
    .db("photography_gear")
    .collection("lens")
    .find();
  const lenses = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(lenses);
};

const getById = async (req, res, next) => {
    const lensId = new ObjectId(req.params.id);
    const result = mongoDb
        .getDb()
        .db("photography_gear")
        .collection("lens")
        .find({ _id: lensId });
    const lens = await result.toArray();
    res.setHeader("content_type", "application/json");
    res.status(200).json(lens[0]);
};

module.exports = { 
    getAll,
    getById
};
