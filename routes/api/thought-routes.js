// const router = require('express').Router();
var express = require('express');
var router = express.Router();

const {
     getAllThoughts,
     getOneThought,
     createThought,
     updateThought,
     deleteThought,
     createReaction,
     deleteReaction
} = require('../../controllers/thought-controller');


// api route for all thoughts
router.route('/').get(getAllThoughts).post(createThought)

// api routes for single thought
router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought)

// api route for reactions
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction)


module.exports = router;