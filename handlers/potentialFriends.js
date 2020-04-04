const db = require("../models");

exports.getPotentialFriend = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      username: req.params.username
    });
    if (!user) {
      return res.status(200).json({message: "user not found"})
    }

    let foundFriendRequest = await db.FriendRequest.find({
      requestor: req.params.id,
      recipient: user._id
    })

    if (foundFriendRequest.length > 0) {
      return res.status(200).json({message: "friend request already sent"})
    }

    let currentUserId = req.params.id
    let currentUser = await db.User.findById(currentUserId)

    if (currentUser.friends.includes(user._id)) {
      return res.status(200).json({message: "user is already a friend", user})
    }
    if(user._id == currentUserId) {
      return res.status(200).json({message: "this is you", user})
    }
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};
