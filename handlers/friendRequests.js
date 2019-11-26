const db = require("../models");

exports.createFriendRequest = async function(req, res, next) {
  try {
    let friendRequest = await db.FriendRequest.create({
      requestorId: req.params.id,
      recipientId: req.params.recipientId,
      status: 1,
      user: req.params.id
    });

    let requestor = await db.User.findById(req.params.id);
    requestor.friendRequests.push(friendRequest.id);
    await requestor.save();

    let recipient = await db.User.findById(req.params.recipientId);
    recipient.friendRequests.push(friendRequest.id);
    await recipient.save();

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
