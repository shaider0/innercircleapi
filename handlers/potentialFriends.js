const db = require("../models");

exports.getPotentialFriend = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      username: req.params.username
    });
    if (!user) {
      return res.status(200).json({message: "user not found"})
    }
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};
