const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const port = process.env.PORT || 5500;
const mongoDb = require("./database/connection");
const bodyParser = require("body-parser");

app
  .use(cors())
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

mongoDb.initDb((err, mongoDb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Server listening on port ${port}`);
  }
});
