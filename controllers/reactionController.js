const { Thought } = require('../models');

const reactionController = {
  async createReaction(req, res) {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with that id found!' });
        return;
      }

      res.status(201).json('Reaction added!');
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteReaction(req, res) {
    const { thoughtId, reactionId } = req.params;
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { reactionId: reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with that id found!' });
        return;
      }

      res.status(200).json('Reaction removed!');
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = reactionController;
