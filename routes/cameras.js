const express = require("express");
const router = express.Router();
const camerasController = require("../controllers/cameras");

// ============================================
// GET routes
// ============================================
router.get("/", camerasController.getAll);
router.get("/:id", camerasController.getById);

// ============================================
// POST route
// ============================================
router.post("/", camerasController.insertCamera);

module.exports = router;
