const express = require("express");
const app = express();
const routes = require("./routes");
const mongodb = require("./db/db");
//implementing the routes
app.use("/", routes);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MongoDB app listen on port 3000");
    app.listen(3000);
  }
});
