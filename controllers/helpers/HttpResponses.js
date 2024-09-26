class HttpResponses {
  static success(res, data, message, status = 200) {
    return res.status(status).json({
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
