const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat'); // Import the dateFormat function if you have it

// Define the Reaction schema
const ReactionSchema = new Schema({
  reactionId: {
    type: Types.ObjectId,
    default: () => new Types.ObjectId(), // Create a new ObjectId as default
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => dateFormat(createdAt), // Use your dateFormat function here
  },
});

// Define the Thought schema
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => dateFormat(createdAt), // Use your dateFormat function here
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema],
});

// Create and export the Thought model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
