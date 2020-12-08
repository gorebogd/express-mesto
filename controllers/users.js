const path = require('path');
const readFile = require('../utils/read-file');

const pathToUsers = path.join(__dirname, '..', 'data', 'users.json');

module.exports.getUsers = (req, res) => {
  readFile(pathToUsers)
    .then((data) => res.send(data))
    .catch(() => {
      res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
    });
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  readFile(pathToUsers)
    .then((data) => {
      const user = data.find((item) => item._id === id);
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};
