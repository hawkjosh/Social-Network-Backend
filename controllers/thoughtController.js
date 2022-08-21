const { User, Thought, Reaction } = require('../models');

module.exports = {
  // Route to get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res. status(500).json(err));
  },
  // Route to get single thought by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      // .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Sorry, no thought was found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res. status(500).json(err));
  },
  // Route to create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Route to update thought by ID
  updateThought(req, res) {
    // Thought.updateOne({ _id: req.params.thoughtId }, req.body)
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {$set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Sorry, no thought was found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Route to delete thought by ID
  deleteThought(req, res) {
    // Thought.deleteOne({ _id: req.params.thoughtId })
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Sorry, no thought was found with that ID' })
          : res.json({ message: 'Thought has been successfully deleted' })
      )
      .catch((err) => res. status(500).json(err));
  },
  // Route to add reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {$push: { reactions: req.body } }
    )
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'Sorry, no thought was found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res. status(500).json(err));
  },
  // Route to delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {$pull: { reactions: req.body } }
    )
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'Sorry, no thought was found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res. status(500).json(err));
  },
};