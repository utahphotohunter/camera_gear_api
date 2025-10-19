const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5500;
const mongoDB = require("./database/connection");
const bodyParser = require("body-parser");

app
  .use(cors())
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

mongoDB.initDb((err, mongoDB) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Server listening on https://localhost:${port}`);
  }
});
