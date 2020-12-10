const path = require('path');
const readFile = require('../utils/read-file');

const pathToUsers = path.join(__dirname, '..', 'data', 'users.json');

module.exports.getUsers = (req, res) => {
  readFile(pathToUsers)
    .then((data) => res.send(data))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  readFile(pathToUsers)
    .then((data) => {
      const user = data.find((item) => item._id === id);
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(user);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};
