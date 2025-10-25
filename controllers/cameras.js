const mongoDb = require("../database/connection");
const ObjectId = require("mongodb").ObjectId;

// ==============================================
// GET logic
// ==============================================
const getAll = async (req, res, next) => {
  const result = mongoDb
    .getDb()
    .db("photography_gear")
    .collection("camera")
    .find();
  const cameras = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(cameras);
};

const getById = async (req, res, next) => {
  const cameraId = new ObjectId(req.params.id);
  const result = mongoDb
    .getDb()
    .db("photography_gear")
    .collection("camera")
    .find({ _id: cameraId });
  const camera = await result.toArray();
  res.setHeader("content_type", "application/json");
  res.status(200).json(camera[0]);
};

// ==============================================
// POST logic
// ==============================================
const insertCamera = async (req, res) => {
  const camera = {
    model: req.body.model,
    brand: req.body.brand,
    mirrorless: req.body.mirrorless,
    sensor: req.body.sensor,
    mobility: req.body.mobility,
    environment: req.body.environment,
    weight: req.body.weight,
    size: req.body.size,
    battery: req.body.battery,
    speed: req.body.speed,
  };
  const response = await mongoDb
    .getDb()
    .db("photography_gear")
    .collection("camera")
    .insertOne(camera);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while inserting the camera");
  }
};

// ==============================================
// PUT logic
// ==============================================
const updateCamera = async (req, res) => {
  const cameraId = new ObjectId(req.params.id);
  const camera = {
    model: req.body.model,
    brand: req.body.brand,
    mirrorless: req.body.mirrorless,
    sensor: req.body.sensor,
    mobility: req.body.mobility,
    environment: req.body.environment,
    weight: req.body.weight,
    size: req.body.size,
    batter: req.body.battery,
    speed: req.body.speed,
  };
  const response = await mongoDb
    .getDb()
    .db("photography_gear")
    .collection("camera")
    .replaceOne({ _id: cameraId }, camera);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the camera.");
  }
};

// ==============================================
// DELETE logic
// ==============================================
const deleteCamera = async (req, res) => {
  const cameraId = new ObjectId(req.params.id);
  const response = await mongoDb
    .getDb()
    .db("photography_gear")
    .collection("camera")
    .deleteOne({ _id: cameraId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while deleting the camera.");
  }
};

module.exports = {
  getAll,
  getById,
  insertCamera,
  updateCamera,
  deleteCamera,
};
