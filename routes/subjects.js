const express = require("express");
const router = express.Router();
const subjectsController = require("../controllers/subjects");

// ============================================
// GET routes
// ============================================
router.get("/", subjectsController.getAll);
router.get("/:id", subjectsController.getById);

// ============================================
// POST route
// ============================================
router.post("/", subjectsController.insertSubject);

module.exports = router;
