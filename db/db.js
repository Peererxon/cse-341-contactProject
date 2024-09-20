const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const mongoURL = process.env.MONGOSTRING;
let _db;

const mongoClient = new MongoClient(mongoURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const initDb = (callback) => {
  console.log("Initializing db");
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }
  mongoClient
    .connect()
    .then((client) => {
      console.log("Connected to MongoDB");
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
