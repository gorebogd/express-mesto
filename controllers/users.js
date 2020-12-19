const User = require('../models/user');

function getUsers(req, res) {
  User.find()
    .then((data) => res.send(data))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
}

function getUser(req, res) {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new Error('notExistId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'notExistId') {
        res.status(404).send({ message: 'Нет пользователья с таким id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неверный id' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
}

function createUser(req, res) {
  User.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'Validation Error') {
        return res.status(400).send({ message: 'Данные невалидны' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
};
