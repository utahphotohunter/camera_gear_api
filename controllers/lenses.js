const mongoDb = require("../database/connection");
const { lensSchema } = require("../helpers/validator");
const ObjectId = require("mongodb").ObjectId;

// ==============================================
// GET logic
// ==============================================
const getAll = async (req, res, next) => {
  try {
    const result = mongoDb
      .getDb()
      .db("photography_gear")
      .collection("lens")
      .find();
    const lenses = await result.toArray();
    res.setHeader("content-type", "application/json");
    res.status(200);
    res.json(lenses);
  } catch (error) {
    res
      .status(500)
      .json(error.message || "Some error occured while retrieving the lenses.");
  }
};

const getById = async (req, res, next) => {
  try {
    const lensId = new ObjectId(req.params.id);
    const result = mongoDb
      .getDb()
      .db("photography_gear")
      .collection("lens")
      .find({ _id: lensId });
    const lens = await result.toArray();
    if (!lens.length > 0) {
      const error = new Error("No data found with that Id");
      error.name = "blank id";
      throw error;
    }
    res.setHeader("content_type", "application/json");
    res.status(200).json(lens[0]);
  } catch (error) {
    if (error.isJoi) {
      res.status(422).json(error.message);
    } else if ((error.name = "blank id")) {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(
          error.message || "Some error occured while retrieving this lens."
        );
    }
  }
};

// ==============================================
// POST logic
// ==============================================
const insertLens = async (req, res) => {
  try {
    const lens = {
      model: req.body.model,
      micro: req.body.micro,
      mobility: req.body.mobility,
      environment: req.body.environment,
      weight: req.body.weight,
      size: req.body.size,
      zoom: req.body.zoom,
    };
    const result = await lensSchema.validateAsync(lens);
    const response = await mongoDb
      .getDb()
      .db("photography_gear")
      .collection("lens")
      .insertOne(lens);
    if (response.acknowledged) {
      res.status(201).json(response);
    }
  } catch (error) {
    if (error.isJoi) {
      res.status(422).json(error.message);
    } else {
      res
        .status(500)
        .json(error.message || "Some error occured while inserting the lens");
    }
  }
};

// ==============================================
// PUT logic
// ==============================================
const updateLens = async (req, res) => {
  try {
    const lensId = new ObjectId(req.params.id);
    const lens = {
      model: req.body.model,
      micro: req.body.micro,
      mobility: req.body.mobility,
      environment: req.body.environment,
      weight: req.body.weight,
      size: req.body.size,
      zoom: req.body.zoom,
    };
    const result = await lensSchema.validateAsync(lens);
    const response = await mongoDb
      .getDb()
      .db("photography_gear")
      .collection("lens")
      .replaceOne({ _id: lensId }, lens);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    }
  } catch (error) {
    if (error.isJoi) {
      res.status(422).json(error.message);
    } else {
      res.status(500);
      res.json(
        error.message || "Some error occured while updating this camera."
      );
    }
  }
};

// ==============================================
// DELETE logic
// ==============================================
const deleteLens = async (req, res) => {
  try {
    const lensId = new ObjectId(req.params.id);
    const response = await mongoDb
      .getDb()
      .db("photography_gear")
      .collection("lens")
      .deleteOne({ _id: lensId }, true);
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
        .json(error.message || "Some error occured while deleting the lens.");
    }
  }
};

module.exports = {
  getAll,
  getById,
  insertLens,
  updateLens,
  deleteLens,
};
