const mongodb = require("../db/db");

const getContacts = async (req, res) => {
  // Logic to get all contacts
  const contacts = await mongodb
    .getDb()
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .find();
  console.log(contacts);
  res.send("Get all contacts");
};

const getContactById = (req, res) => {
  const { id } = req.params;
  // Logic to get a contact by ID
  res.send(`Get contact with ID: ${id}`);
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
