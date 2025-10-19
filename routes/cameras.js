const express = require("express");
const router = express.Router();

// ============================================
// GET routes
// ============================================
router.get("/", require("../controllers/cameras").getAll);

module.exports = router;
