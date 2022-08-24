const { User, Thought } = require('../models');

module.exports = {

  // Route to get all users
  getUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res. status(500).json(err));
  },

  // Route to get single user by userId
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .populate({ path: 'thoughts' })
    .populate({ path: 'friends' })
    .then((user) =>
      !user
        ? res.status(404).json({ message: '⛔ Sorry, no user was found with that ID' })
        : res.json(user)
    )
    .catch((err) => res. status(500).json(err));
  },

  // Route to create a user
  createUser(req, res) {
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },

  // Route to update user by userId
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: '⛔ Sorry, no user was found with that ID' })
        : res.json({ message: '✅ User has been successfully updated' })
    )
    .catch((err) => res.status(500).json(err));
  },

  // Route to delete user and associated thoughts by userId
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) => {
      return Thought.deleteMany(
        { _id: { $in: user.thoughts }}
      );
    })
    .then((user) =>
      !user
        ? res.status(404).json({ message: '⛔ Sorry, no user was found with that ID' })
        : res.json({ message: '✅ User and associated thoughts have been successfully deleted' })
    )
    .catch((err) => res. status(500).json(err));
  },

  // Route to add friend by userId
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } }
    )
    .then((user) => 
      !user
        ? res.status(404).json({ message: '⛔ Sorry, no user was found with that ID' })
        : res.json({ message: '✅ Friend has been successfully added' })
    )
    .catch((err) => res. status(500).json(err));
  },

  // Route to delete friend by userId
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }
    )
    .then((user) => 
      !user
        ? res.status(404).json({ message: '⛔ Sorry, no user was found with that ID' })
        : res.json({ message: '✅ Friend has been successfully deleted' })
    )
    .catch((err) => res. status(500).json(err));
  },
};