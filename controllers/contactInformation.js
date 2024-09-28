const { ObjectId } = require("mongodb");
const mongodb = require("../db/db");
const { ApiMessages } = require("./helpers/ApiMessages");

// Helper function to validate ID
function validateId(id) {
  return ObjectId.isValid(id);
}

const getContacts = async (req, res) => {
  // Logic to get all contacts
  const result = await mongodb.getContactCollection().find();
  result.toArray().then((contacts) => {
    console.log(contacts);
    // res.send(contacts).status(200).json();
    ApiMessages.contactsFound(res, contacts);
  });
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const isIdValid = validateId(id);
  if (!isIdValid) {
    res.send("Invalid ID").status(422);
    return;
  }

  const userId = ObjectId.createFromHexString(id);
  const query = { _id: userId };
  console.log("🚀 ~ getContactById ~ userId:", userId);
  try {
    const result = await mongodb.getContactCollection().findOne(query);
    console.log("🚀 ~ getContactById AFTER mongo request~ result:", result);
    if (!result) {
      // res.send("Contact not found").status(404);
      ApiMessages.contactNotFound(res);
      return;
    }
    // res.send(result).status(200).json();
    ApiMessages.contactFound(res, result);
  } catch (error) {
    console.log(error);
    // res.send("Contact not found").status(404);
    ApiMessages.contactNotFound(res);
  }
  // Logic to get a contact by ID
};

const createContact = async (req, res) => {
  const newContact = req.body;
  // Logic to create a new contact
  try {
    mongodb.getContactCollection().insertOne(newContact);
    await ApiMessages.contactCreated(res, newContact);
  } catch (error) {
    console.log(error);
    // res.send("Error creating contact").status(500);
    ApiMessages.createContactError(res);
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updatedContact = req.body;

  const validId = validateId(id);
  if (!validId) {
    res.send("Invalid ID").status(422);
    return;
  }

  try {
    const userId = ObjectId.createFromHexString(id);
    const query = { _id: userId };

    delete updatedContact._id; // avoid updating the ID
    const result = await mongodb
      .getContactCollection()
      .updateOne(query, { $set: updatedContact });
    console.log("🚀 ~ updateContact ~ result:", result);
    if (result.modifiedCount === 0) {
      // res.send("Contact not found").status(404);
      ApiMessages.contactNotFound(res);
      return;
    }

    ApiMessages.contactUpdated(res, updatedContact);
  } catch (error) {
    console.log(error);
    // res.send("Error updating contact").status(500);
    ApiMessages.updateContactError(res);
  }
};

const deleteContactByID = async (req, res) => {
  const { id } = req.params;
  // Logic to delete a contact by ID
  const validId = validateId(id);

  if (!validId) {
    res.send("Invalid ID").status(422);
    return;
  }
  try {
    const userId = ObjectId.createFromHexString(id);
    const query = { _id: userId };
    await mongodb.getContactCollection().deleteOne(query);
    ApiMessages.contactDeleted(res);
  } catch (error) {
    console.log(error);
    ApiMessages.FailureDeletingContact(res);
  }
};

const contactInformationController = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact: deleteContactByID,
};

module.exports = {
  contactInformationController,
};
