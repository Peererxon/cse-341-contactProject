const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output-modified.json");

const routes = require("./routes/index");
const mongodb = require("./db/db");

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
  if (res.headersSent) {
    console.log("Headers already sent");
    return next();
  }
  next();
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
