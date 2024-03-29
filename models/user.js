const mongoose = require('mongoose');
const regex = require('../utils/regex');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regex.test(v),
      message: 'Невалидная ссылка',
    },
  },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
