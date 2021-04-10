class responseHandler {
  static respSuccess(res, status = 200, message, data) {
    return res.status(status).send({
      status,
      message,
      data,
    });
  }
  static respError(res, status = 500, message, error = {}) {
    return res.status(status).send({
      status,
      message,
      error,
    });
  }
}
export default responseHandler;