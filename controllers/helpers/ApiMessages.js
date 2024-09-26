const { HttpResponses } = require("./HttpResponses");

class ApiMessages {
  static contactNotFound(res) {
    return HttpResponses.error(res, "Contact not found", 404);
  }

  static invalidId(res) {
    return HttpResponses.error(res, "Invalid ID", 422);
  }

  static contactCreated(res, data) {
    return HttpResponses.success(res, data, `Contact created`);
  }

  static contactUpdated(res, data) {
    return HttpResponses.success(res, data, "Contact updated");
  }

  static contactDeleted(res, data) {
    return HttpResponses.success(res, data, "Contact deleted");
  }

  static FailureDeletingContact(res) {
    return HttpResponses.error(res, "Contact not found", 404);
  }
}

module.exports = { ApiMessages };
