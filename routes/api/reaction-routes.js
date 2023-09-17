const express = require('express');
const router = express.Router();
const {
  createReaction,
  deleteReaction
} = require('../../controllers/reactionController');

router
  .route('/thoughts/:thoughtId/reactions')
  .post(createReaction);

router
  .route('/thoughts/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;
