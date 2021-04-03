const db = require("../models");
const mongoose = require('mongoose')

exports.createConversation = async function(req, res, next) {
  try {
    let conversation = await db.Conversation.create({
      members: req.body.members
    });
    return res.status(200).json(conversation);
  } catch (err) {
    return next(err);
  }
};
