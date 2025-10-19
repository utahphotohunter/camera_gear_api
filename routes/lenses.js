const express = require("express");
const router = express.Router();

// ============================================
// GET routes
// ============================================
router.get("/", require("../controllers/lenses").getAll);

module.exports = router;
