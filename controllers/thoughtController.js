const { User, Thought } = require('../models');

module.exports = {

  // Route to get all thoughts
  getThoughts(req, res) {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res. status(500).json(err));
  },

  // Route to get single thought by thoughtId
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v')
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: '⛔ Sorry, no thought was found with that ID' })
        : res.json(thought)
    )
    .catch((err) => res. status(500).json(err));
  },

  // Route to create a thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
      return User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
    })
    .then((thought) => 
      !thought
        ? res.status(404).json({ message: '⚠️ Thought created, but no user found with that username' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },

  // Route to update thought by thoughtId
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body }
    )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: '⛔ Sorry, no thought was found with that ID' })
        : res.json({ message: '✅ Thought has been successfully updated' })
    )
    .catch((err) => res.status(500).json(err));
  },

  // Route to delete thought by thoughtId
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then(() => {
      return User.findOneAndUpdate(
        { $pull: { thoughts: req.params.thoughtId } }
      );
    })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: '⛔ Sorry, no thought was found with that ID' })
        : res.json({ message: '✅ Thought has been successfully deleted' })
    )
    .catch((err) => res. status(500).json(err));
  },

  // Route to add reaction by thoughtId
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } }
    )
    .then((thought) => 
      !thought
        ? res.status(404).json({ message: '⛔ Sorry, no thought was found with that ID' })
        : res.json({ message: '✅ Reaction has been successfully added' })
    )
    .catch((err) => res. status(500).json(err));
  },

  // Route to delete reaction by thoughtId
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.body } }
    )
    .then((thought) => 
      !thought
        ? res.status(404).json({ message: '⛔ Sorry, no thought was found with that ID' })
        : res.json({ message: '✅ Reaction has been successfully deleted' })
    )
    .catch((err) => res. status(500).json(err));
  },
};