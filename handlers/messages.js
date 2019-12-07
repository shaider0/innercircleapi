const db = require("../models");
const mongoose = require('mongoose')

exports.sendMessage = async function(req, res, next) {
  try {
    let recipient = await db.User.find({
      username: req.body.recipientUsername
    })

    console.log(req.params.id)
    console.log(recipient[0]._id)
    console.log(req.body.message)

    let message = await db.Message.create({
      sender: req.params.id,
      recipient: recipient[0]._id,
      message: req.body.message,
      user: req.params.id
    });

    console.log("### function is hitting", message)

    return res.status(200).json(message);

  } catch (err) {
    return next(err);
  }
};
