const { Schema, model } = require("mongoose");
var express = require('express');
var router = express.Router();

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trimmed: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /.+\@.+\..+/,
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
      {
          type: Schema.Types.ObjectId,
          ref: 'User'
      }
    ]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
}
);

// retrieve total friends count and return
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create model from schema
const User = model('User', UserSchema);

module.exports = { router, User };