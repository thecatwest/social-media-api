const { urlToHttpOptions } = require('http');
const { Schema, model, Types } = require('mongoose');
dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdValue => dateFormat(createdValue)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

const ReactionSchema = new Schema(
    {
        reactionId: {
            objectId
        },
        reactionBody: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdValue => dateFormat(createdValue)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

// retrieve length of array of reactions to thougths using virtual
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create model from schema
const Thought = model('Thought', ThoughtSchema);

module.exports - Thought;