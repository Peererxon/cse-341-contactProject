const dotenv = require("dotenv");
const MongoClient = require("mongodb").MongoClient;

dotenv.config();

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGOSTRING)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

const closeDb = () => {
  if (_db) {
    _db.close();
  }
};

const getContactCollection = () =>
  this.getDb().db("sample_airbnb").collection("listingsAndReviews");

module.exports = {
  initDb,
  getDb,
  getContactCollection,
  closeDb,
};
