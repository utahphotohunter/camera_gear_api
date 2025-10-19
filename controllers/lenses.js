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

// ==============================================
// POST logic
// ==============================================
const insertLens = async (req, res) => {
  const lens = {
    model: req.body.model,
    micro: req.body.micro,
    mobility: req.body.mobility,
    environment: req.body.environment,
    weight: req.body.weight,
    size: req.body.size,
    zoom: req.body.zoom,
  };
  const response = await mongoDb
    .getDb()
    .db("photography_gear")
    .collection("lens")
    .insertOne(lens);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while inserting the contact");
  }
};

module.exports = {
  getAll,
  getById,
  insertLens,
};
