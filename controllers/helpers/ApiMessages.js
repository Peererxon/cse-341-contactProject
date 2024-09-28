const { HttpResponses } = require("./HttpResponses");

class ApiMessages {
  static contactNotFound(res) {
    return HttpResponses.error(res, "Contact not found", 404);
  }

  static invalidId(res) {
    return HttpResponses.error(res, "Invalid ID", 422);
  }

  static contactCreated(res, data) {
    return HttpResponses.success(res, data, `Contact created`, 201);
  }

  static contactUpdated(res, data) {
    return HttpResponses.success(res, data, "Contact updated");
  }

  static contactDeleted(res) {
    return HttpResponses.success(res, "Contact deleted", 204);
  }

  static FailureDeletingContact(res) {
    return HttpResponses.error(res, "Contact not found, user not deleted", 404);
  }

  static contactsFound(res, data) {
    return HttpResponses.success(res, data, "Contacts found");
  }

  static contactFound(res, data) {
    return HttpResponses.success(res, data, "Contact found");
  }

  static createContactError(res) {
    return HttpResponses.error(res, "Error creating contact", 500);
  }

  static updateContactError(res) {
    return HttpResponses.error(res, "Error updating contact", 500);
  }
}

module.exports = { ApiMessages };
