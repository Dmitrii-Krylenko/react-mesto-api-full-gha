const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequest = require('../errors/badrequesterr');
const Conflict = require('../errors/conflict');
const NotFound = require('../errors/notfound');
const Unauthorized = require('../errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;
// Rout user
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь по указанному _id не найден.'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные для получения карточки.'));
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.status(201).send({
        _id: user._id, email: user.email, name: user.name, about: user.about, avatar: user.avatar,
      }))
      .catch((err) => {
        if (err.code === 11000) {
          return next(new Conflict('Такой пользователь уже существует.'));
        }
        if (err.name === 'ValidationError') {
          return next(new BadRequest('Переданы некорректные данные при создании пользователя. по умолчанию.'));
        }
        return next(err);
      }));
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  // const owner = req.user._id;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(
          new NotFound('Пользователь с указанным _id не найден.'),
        );
      }
      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  // const owner = req.user._id;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(
          new NotFound('Пользователь с указанным _id не найден.'),
        );
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
      }

      // сравниваем переданный пароль и хеш из базы
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          const options = {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          };
          res.cookie('loginedUserToken', token, options);
          // аутентификация успешна
          return res.send({
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              about: user.about,
              avatar: user.avatar,
            },
          });
        });
    })

    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(
          new NotFound('Пользователь с указанным _id не найден.'),
        );
      }
      return res.status(200).send(user);
    })
    .catch(next);
};
