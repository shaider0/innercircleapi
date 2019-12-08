const db = require("../models");
const mongoose = require('mongoose')

exports.sendMessage = async function(req, res, next) {
  try {
    let recipient = await db.User.find({
      username: req.body.recipientUsername
    })

    let message = await db.Message.create({
      sender: req.params.id,
      recipient: recipient[0]._id,
      message: req.body.message,
      user: req.params.id
    });

    return res.status(200).json(message);

  } catch (err) {
    return next(err);
  }
};

exports.getMessages = async function(req, res, next) {
  try {
    let userId = req.params.id
    let messages = await db.Message.find({
      recipient: userId
    }).populate("sender", {
      username: true,
      profileImageUrl: true
    })
    return res.status(200).json(messages)
  } catch (err) {
    return next(err)
  }
}
