const express = require("express");
const router = express.Router();
const lensesController = require("../controllers/lenses");

// const createError = require("http-errors");
// const { lensSchema } = require("../helpers/validator");

// ============================================
// GET routes
// ============================================
router.get("/", lensesController.getAll);
router.get("/:id", lensesController.getById);

// ============================================
// POST route
// ============================================
router.post("/", lensesController.insertLens);

// ============================================
// PUT route
// ============================================
router.put("/:id", lensesController.updateLens);

// ============================================
// DELETE route
// ============================================
router.delete("/:id", lensesController.deleteLens);

module.exports = router;
