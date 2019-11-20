const db = require("../models");

exports.createFriendRequest = async function(req, res, next) {
  try {
    let friendRequest = await db.FriendRequest.create({
      requestorId: req.params.id,
      recipientId: req.body.recipientId,
      status: 1,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.friendRequests.push(friendRequest.id);
    await foundUser.save();

    let receivingUser = await db.User.findById(req.body.recipientId);
    receivingUser.friendRequests.push(friendRequest.id);
    await receivingUser.save();

    let foundFriendRequest = await db.FriendRequest.findById(friendRequest._id).populate("user", {
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
