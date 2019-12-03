const db = require("../models");

exports.updateUser = async function(req, res, next) {
  try {
    let updatedUser = await db.User.update({_id: req.params.id}, {
      profileImageUrl: req.body.url
    });
    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};
