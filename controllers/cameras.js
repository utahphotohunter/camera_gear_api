const mongoDb = require("../database/connection");
const { cameraSchema } = require("../helpers/validator");
const ObjectId = require("mongodb").ObjectId;

// ==============================================
// GET logic
// ==============================================
const getAll = async (req, res, next) => {
  try {
    const result = mongoDb
      .getDb()
      .db("photography_gear")
      .collection("camera")
      .find();
    const cameras = await result.toArray();
    res.setHeader("content-type", "application/json");
    res.status(200);
    res.json(cameras);
  } catch (error) {
    res
      .status(500)
      .json(
        error.message || "Some error occured while retrieving the cameras."
      );
  }
};

const getById = async (req, res, next) => {
  try {
    const cameraId = new ObjectId(req.params.id);
    const result = mongoDb
      .getDb()
      .db("photography_gear")
      .collection("camera")
      .find({ _id: cameraId });
    const camera = await result.toArray();
    if (!camera.length > 0) {
      const error = new Error("No data found with that Id");
      error.name = "blank id";
      throw error;
    }
    res.setHeader("content_type", "application/json");
    res.status(200).json(camera[0]);
  } catch (error) {
    if (error.isJoi) {
      res.status(422).json(error.message);
    } else if ((error.name = "blank id")) {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(
          error.message || "Some error occured while retrieving this camera."
        );
    }
  }
};

// ==============================================
// POST logic
// ==============================================
const insertCamera = async (req, res) => {
  try {
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
    const result = await cameraSchema.validateAsync(camera);
    const response = await mongoDb
      .getDb()
      .db("photography_gear")
      .collection("camera")
      .insertOne(camera);
    if (response.acknowledged) {
      res.status(201).json(response);
    }
  } catch (error) {
    if (error.isJoi) {
      res.status(422).json(error.message);
    } else {
      res
        .status(500)
        .json(error.message || "Some error occured while inserting the camera");
    }
  }
};

// ==============================================
// PUT logic
// ==============================================
const updateCamera = async (req, res) => {
  try {
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
      battery: req.body.battery,
      speed: req.body.speed,
    };
    const result = await cameraSchema.validateAsync(camera);
    const testIfExists = mongoDb
      .getDb()
      .db("photography_gear")
      .collection("camera")
      .find({ _id: cameraId });
    const exists = await testIfExists.toArray();
    if (!exists.length > 0) {
      const error = new Error("No data found with that Id");
      error.name = "no such id";
      throw error;
    }
    const response = await mongoDb
      .getDb()
      .db("photography_gear")
      .collection("camera")
      .replaceOne({ _id: cameraId }, camera);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    }
  } catch (error) {
    if (error.isJoi) {
      res.status(422).json(error.message);
    } else if ((error.name = "no such id")) {
      res.status(404).json(error.message);
    } else {
      res.status(500);
      res.json(
        error.message || "Some error occured while updating the camera."
      );
    }
  }
};

// ==============================================
// DELETE logic
// ==============================================
const deleteCamera = async (req, res) => {
  try {
    const cameraId = new ObjectId(req.params.id);
    const response = await mongoDb
      .getDb()
      .db("photography_gear")
      .collection("camera")
      .deleteOne({ _id: cameraId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("id does not exist");
      error.name = "no such id";
      throw error;
    }
  } catch (error) {
    if (error.isJoi) {
      res.status(422).json(error.message);
    } else if ((error.name = "no such id")) {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(error.message || "Some error occured while deleting the camera.");
    }
  }
};

module.exports = {
  getAll,
  getById,
  insertCamera,
  updateCamera,
  deleteCamera,
};
