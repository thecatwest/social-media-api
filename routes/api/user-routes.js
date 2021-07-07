// const router = require("express").Router();
var express = require('express');
var router = express.Router();

const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require("../../controllers/user-controller");

// api route for all users
router.route("/").get(getAllUsers).post(createUser);

// api route for individual user
router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

// api route for individual friend
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;