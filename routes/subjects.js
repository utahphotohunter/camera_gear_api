const express = require("express");
const router = express.Router();

// ============================================
// GET routes
// ============================================
router.get("/", require("../controllers/subjects").getAll);

module.exports = router;
