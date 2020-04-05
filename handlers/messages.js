const db = require("../models");
const mongoose = require('mongoose')

exports.sendMessage = async function(req, res, next) {
  try {
    let userId = req.params.id
    let user = await db.User.findById(userId)
    let friends = user.friends
    let recipient = await db.User.find({
      username: req.body.recipientUsername
    })

    if(recipient.length === 0) {
      return res.status(200).json('user not found')
    }
    if (!friends.includes(recipient[0]._id)) {
      return res.status(200).json('user not a friend')
    }

    let message = await db.Message.create({
      sender: req.params.id,
      recipient: recipient[0]._id,
      content: req.body.content,
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
    }).populate("itemId")
    return res.status(200).json(messages)
  } catch (err) {
    return next(err)
  }
}

exports.deleteMessage = async function(req, res, next) {
  try {
    await db.Message.deleteOne({
      _id: req.params.message_id
    })
    return res.status(200).json('deleted');
  } catch (err) {
    return next(err);
  }
}
