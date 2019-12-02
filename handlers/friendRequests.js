const db = require("../models");
const mongoose = require('mongoose')

exports.createFriendRequest = async function(req, res, next) {
  try {
    let friendRequest = await db.FriendRequest.create({
      requestor: req.params.id,
      recipient: req.params.recipientId,
      status: 1,
      user: req.params.id
    });
    let foundFriendRequest = await db.FriendRequest.findById(friendRequest.id).populate("user", {
      username: true,
      profileImageUrl: true
    });

    return res.status(200).json(foundFriendRequest);
  } catch (err) {
    return next(err);
  }
};

exports.deleteFriendRequest = async function(req, res, next) {
  try {
    let foundFriendRequest = await db.FriendRequest.findById(req.params.friendRequest_id);
    await foundFriendRequest.remove()
    return res.status(200).json(foundFriendRequest);
  } catch (err) {
    return next(err);s
  }
};

exports.getFriendRequests = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      _id: req.params.id
    });
    if (!user) {
      return res.status(200).json({message: "user not found"})
    }
    let friendRequests = await db.FriendRequest.find({
      recipient: req.params.id,
      status: 1
    }).populate('requestor')
    return res.status(200).json(friendRequests);
  } catch (err) {
    return next(err);
  }
};

exports.updateFriendRequest = async function(req, res, next) {
  try {
    let userId = req.params.id
    let foundFriendRequest = await db.FriendRequest.findById(req.params.friendRequest_id)
    let friendId = foundFriendRequest.requestor
    await foundFriendRequest.update(req.body)
    let updatedFriendRequest = await db.FriendRequest.findById(req.params.friendRequest_id)

  // if user is accepting friend request, add the friend to the user's friends
    if (req.body.status === 2) {
      await db.User.update({
        _id: userId
      },  {
        $push: {friends: friendId}
      })
  // and add the user to the friend's friends
      await db.User.update({
        _id: friendId
      },  {
        $push: {friends: userId}
      })

    }
    return res.status(200).json(updatedFriendRequest)
  } catch(err) {
    return next(err)
  }
}
