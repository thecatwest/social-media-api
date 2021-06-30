const { User } = require("../models");

const userController = {
  // get all available users
  getAllUsers(req, res) {
    User.find({})
      .select("-__V")
      .sort({ _id: -1 })
      .then((UsersDb) => res.json(UsersDb))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  // get one user by id
  getOneUser({ params }, res) {
    User.findOne({ _id: params.id })
      .select("-__V")
      .populate({
        path: "friends",
        select: "-__v",
      })
      .populate({
        path: "thoughts",
        select: "-__V",
      })
      .then((UsersDb) => res.json(UsersDb))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  // create (post) new user
  createUser({ body }, res) {
    User.create(body)
      .then((UsersDb) => res.json(UsersDb))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  // delete individual user by id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((UsersDb) => {
        if (!UsersDb) {
          return res
            .sendStatus(404)
            .json({ message: "No user with that ID exists. Try again." });
        }
        res.json(UsersDb);
      })
      .catch((err) => res.json(err));
  },
  // update (put) individual user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      body,
      {
        new: true,
        runValidators: true,
      }
    )
      .then((UsersDb) => {
        if (!UsersDb) {
          return res
            .status(404)
            .json({ message: "No user with that ID exists. Try again." });
        }
        res.json(UsersDb);
      })
      .catch((err) => res.json(err));
  },
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((UsersDb) => {
        if (!UsersDb) {
          return res
            .status(404)
            .json({ message: "No user with that ID exists. Try again." });
        }
        res.json(UsersDb);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((UsersDb) => {
        if (!UsersDb) {
          return res
            .status(404)
            .json({ message: "No user with that ID exists. Try again." });
        }
        res.json(UsersDb);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = { userController };
