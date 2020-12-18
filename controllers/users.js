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
    .onFail(new Error('notValidId'))
    .then((user) => res.send(user))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
}

function createUser(req, res) {
  User.create(req.body)
    .then((user) => res.status(200).send(user))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
};
