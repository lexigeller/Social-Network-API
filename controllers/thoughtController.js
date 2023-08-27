const { Thought, User } = require("../models");

const thoughtController = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find()
        .populate({
          path: "reactions",
          select: "-__v"
        })
        .select("-__v")
        .sort({ _id: -1 });
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getThoughtById(req, res) {
    const { id } = req.params;
    try {
      const thought = await Thought.findOne({ _id: id })
        .populate({
          path: "reactions",
          select: "-__v"
        })
        .select("-__v");
      if (!thought) {
        res.status(404).json({ message: "No thought with this id!" });
        return;
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json("Thought created, but no user with that id found!");
        return;
      }

      res.status(201).json("Thought successfully created!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async updateThought(req, res) {
    const { id } = req.params;
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async removeThought(req, res) {
    const { id } = req.params;
    try {
      const thought = await Thought.findOneAndDelete({ _id: id });

      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }

      const user = await User.findOneAndUpdate(
        { thoughts: id },
        { $pull: { thoughts: id } },
        { new: true }
      );

      if (!user) {
        res.status(404).json("Thought deleted, but no user with that id found!");
        return;
      }

      res.json("Thought successfully deleted!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createReaction(req, res) {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json("No thought with that id found :(");
        return;
      }

      res.status(201).json("Reaction added!");
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
        res.status(404).json("No thought with that id found :(");
        return;
      }

      res.status(200).json("Reaction removed!");
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = thoughtController;
