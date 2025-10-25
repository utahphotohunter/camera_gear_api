const mongoDb = require("../database/connection");
const ObjectId = require("mongodb").ObjectId;

// ==============================================
// GET logic
// ==============================================
const getAll = async (req, res, next) => {
  const result = mongoDb
    .getDb()
    .db("photography_gear")
    .collection("subject")
    .find();
  const subjects = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(subjects);
};

const getById = async (req, res, next) => {
  const subjectId = new ObjectId(req.params.id);
  const result = mongoDb
    .getDb()
    .db("photography_gear")
    .collection("subject")
    .find({ _id: subjectId });
  const subject = await result.toArray();
  res.setHeader("content_type", "application/json");
  res.status(200).json(subject[0]);
};

// ==============================================
// POST logic
// ==============================================
const insertSubject = async (req, res) => {
  const subject = {
    subject: req.body.subject,
    time: req.body.time,
    mirrorless: req.body.mirrorless,
    sensor: req.body.sensor,
    environment: req.body.environment,
    duration: req.body.duration,
    speed: req.body.speed,
    view: req.body.view,
  };
  const response = await mongoDb
    .getDb()
    .db("photography_gear")
    .collection("subject")
    .insertOne(subject);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while inserting the contact");
  }
};

// ==============================================
// PUT logic
// ==============================================
const updateSubject = async (req, res) => {
  const subjectId = new ObjectId(req.params.id);
  // const subject {
  //   subject properties
  // }
  const response = await mongoDb
    .getDb()
    .db("photography-gear")
    .collection("subject")
    .replaceOne({ _id: subjectId }, subject);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the subject.");
  }
};

// ==============================================
// DELETE logic
// ==============================================
const deleteSubject = async (req, res) => {
  const subjectId = new ObjectId(req.params.id);
  const response = await mongoDb
    .getDb()
    .db("photography_gear")
    .collection("subject")
    .deleteOne({ _id: subjectId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while deleting the subject.");
  }
};

module.exports = {
  getAll,
  getById,
  insertSubject,
  updateSubject,
  deleteSubject,
};
