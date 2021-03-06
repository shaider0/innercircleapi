const db = require("../models");

exports.updateUser = async function(req, res, next) {
  try {
    let updatedUser = await db.User.update({_id: req.params.id}, {
      profileImageUrl: req.body.url
    });

    let foundUser = await db.User.findById(req.params.id)

    return res.status(200).json(foundUser);

  } catch (err) {
    return next(err);
  }
};
