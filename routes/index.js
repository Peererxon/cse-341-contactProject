const express = require("express");
const {
  contactInformationController,
} = require("../controllers/contactInformation");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// Create a new contact
router.post("/contacts", contactInformationController.createContact);

// Retrieve all contacts
router.get("/contacts", contactInformationController.getContacts);

// Retrieve a single contact by ID
router.get("/contacts/:id", contactInformationController.getContactById);

// Update a contact by ID
router.put("/contacts/:id", contactInformationController.updateContact);

// Delete a contact by ID
router.delete("/contacts/:id", contactInformationController.deleteContact);

module.exports = router;
