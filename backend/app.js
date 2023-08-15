const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const { routes } = require('./routes');
const errorHandler = require('./middlewares/errorhandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors({ origin: 'https://korolek.nomoreparties.co', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
const main = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  });
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

main();
