const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      default: '',
    },

    imageURL: {
      type: String,
      default: '',
    },

    videoURL: {
      type: String,
      default: '',
    },

    seen: {
      type: Boolean,
      default: false,
    },

    msgByUserId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'UserModel',
    },
  },
  {
    timestamps: true,
  }
);

const ConversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'UserModel',
    },

    receiver: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'UserModel',
    },

    messages: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'MessageModel',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model('MessageModel', MessageSchema);

const ConversationModel = mongoose.model(
  'ConversationModel',
  ConversationSchema
);

module.exports = {
  MessageModel,
  ConversationModel,
};
