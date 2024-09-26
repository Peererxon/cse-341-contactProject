class HttpResponses {
  static success(res, data, message) {
    return res.status(200).json({
      success: true,
      data,
      message,
    });
  }

  static error(res, message, status = 500) {
    return res.status(status).json({
      success: false,
      message,
    });
  }
}

module.exports = { HttpResponses };
