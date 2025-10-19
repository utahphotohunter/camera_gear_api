const express = require("express");
const router = express.Router();

//=========================================
// routes
//=========================================
router.use("/cameras", require("./cameras"));
router.use("/lenses", require("./lenses"));
router.use("/subjects", require("./subjects"));

module.exports = router;
