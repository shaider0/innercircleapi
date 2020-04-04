const db = require("../models");
const mongoose = require('mongoose')

exports.getFriendRequestsSent = async function(req, res, next) {
  try {
    let friendRequests = await db.FriendRequest.find({
      requestor: req.params.id,
      status: 1
    }).populate('recipient')
    console.log('friend requests on server are', friendRequests)
    return res.status(200).json(friendRequests);
  } catch (err) {
     return next(err);
  }
};

exports.deleteFriendRequestSent = async function(req, res, next) {
  try {
    let foundFriendRequest = await db.FriendRequest.findById(req.params.friendRequest_id);
    await db.FriendRequest.deleteOne({
      _id: req.params.friendRequest_id
    })
    return res.status(200).json(foundFriendRequest);
  } catch (err) {
    return next(err);
  }
};
