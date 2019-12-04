const db = require("../models");

exports.getPotentialFriend = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      username: req.params.username
    });
    if (!user) {
      return res.status(200).json({message: "user not found"})
    }
    let currentUserId = req.params.id
    let currentUser = await db.User.findById(currentUserId)
    console.log("#####", currentUser.friends.includes(user._id))
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
