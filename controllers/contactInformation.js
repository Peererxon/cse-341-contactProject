const mongodb = require("../db/db");
const { ObjectId } = require("mongodb");

const getContacts = async (req, res) => {
  // Logic to get all contacts
  const result = await mongodb
    .getDb()
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .find();
  result.toArray().then((contacts) => {
    console.log(contacts);
    res.send("Get all contacts");
  });
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const userId = new ObjectId.createFromHexString(id);
  let query = { _id: userId };
  try {
    let result = await mongodb.getContactCollection.findOne(query);
    res.send(result).status(200).json();
  } catch (error) {
    console.log(error);
    res.send("Contact not found").status(404);
  }
  // Logic to get a contact by ID
};

const createContact = (req, res) => {
  const newContact = req.body;
  // Logic to create a new contact
  res.send("Create a new contact");
};

const updateContact = (req, res) => {
  const { id } = req.params;
  const updatedContact = req.body;
  // Logic to update a contact by ID
  res.send(`Update contact with ID: ${id}`);
};

const deleteContact = (req, res) => {
  const { id } = req.params;
  // Logic to delete a contact by ID
  res.send(`Delete contact with ID: ${id}`);
};

const contactInformationController = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};

module.exports = {
  contactInformationController,
};
