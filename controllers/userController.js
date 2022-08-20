const { User, Thought, Reaction } = require('../models');

module.exports = {
  // Route to get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res. status(500).json(err));
  },
  // Route to get single user by ID
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Sorry, no user was found with that ID' })
          : res.json(user)
      )
      .catch((err) => res. status(500).json(err));
  },
  // Route to create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json({ message: 'User has been successfully created' }, user))
      .catch((err) => res.status(500).json(err));
  },
  // Route to update user by ID
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {$set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Sorry, no user was found with that ID' })
          : res.json({ message: 'User has been successfully updated' }, user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Route to delete user by ID
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Sorry, no user was found with that ID' })
          : res.json({ message: 'User has been successfully deleted' })
      )
      .catch((err) => res. status(500).json(err));
  }
};