const express = require("express");
const router = express.Router();
const lensesController = require("../controllers/lenses");

// ============================================
// GET routes
// ============================================
router.get("/", lensesController.getAll);
router.get("/:id", lensesController.getById);

module.exports = router;
