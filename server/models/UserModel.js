const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },

    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
    },

    password: {
      type: String,
      required: [true, 'Please enter your password'],
    },

    profile_pic: {
      type: String,
      default: '',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;
