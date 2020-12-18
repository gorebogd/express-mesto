const Card = require('../models/card');

function getCards(req, res) {
  Card.find()
    .then((card) => res.status(200).send(card))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
}

function createCard(req, res) {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
    createdAt: Date.now(),
  })
    .then((card) => res.status(200).send(card))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
}

function deleteCard(req, res) {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(new Error('notValidId'))
    .then((card) => res.send(card))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
