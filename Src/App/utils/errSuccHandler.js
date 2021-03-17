class errorSuccessHandler {
  // success handler

  static successHandler(res, status, messsage, data) {
    res.status(status).json({
      status,
      messsage,
      data: { user: data },
    });
  }
  static errorHandler(res, status, messsage) {
    res.status(status).json({
      success: false,
      messsage,
    });
  }
}

export default errorSuccessHandler;
