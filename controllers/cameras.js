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

module.exports = { 
    getAll,
    getById
};
