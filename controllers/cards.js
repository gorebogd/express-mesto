const path = require('path');
const readFile = require('../utils/read-file');

const pathToCards = path.join(__dirname, '..', 'data', 'cards.json');

module.exports.getCards = (req, res) => {
  readFile(pathToCards)
    .then((data) => res.send(data))
    .catch(() => {
      res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
    });
};
