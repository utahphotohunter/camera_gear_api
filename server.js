const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5500;
const mongoDb = require("./database/connection");
const bodyParser = require("body-parser");
const routes = require("./routes");

app
  .use(cors())
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", routes);

mongoDb.initDb((err, mongoDb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Server listening on port ${port}`);
  }
});
