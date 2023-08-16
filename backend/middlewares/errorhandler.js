const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;
  if (!statusCode) {
    return res.status(500).send({
      message: !message
        ? 'На сервере произошла ошибка'
        : message,
    });
  }

  return next();
};

module.exports = errorHandler;
