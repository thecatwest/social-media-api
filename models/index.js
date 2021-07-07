const User = require('./User');
const Thought = require('./Thought');
var express = require('express');
var router = express.Router();

module.exports = { User, Thought, router };