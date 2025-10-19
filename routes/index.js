const express = require("express");
const router = express.Router();
const swagger = require("./swagger")

//=========================================
// routes
//=========================================
router.use("/", swagger);
router.use("/cameras", require("./cameras"));
router.use("/lenses", require("./lenses"));
router.use("/subjects", require("./subjects"));

module.exports = router;
