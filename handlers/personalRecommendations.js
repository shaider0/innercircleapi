const db = require("../models");
const mongoose = require('mongoose')

exports.sendPersonalRecommendation = async function(req, res, next) {
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

    let personalRecommendation = await db.PersonalRecommendation.create({
      sender: req.params.id,
      recipient: recipient[0]._id,
      itemId: req.body.itemId,
      customMessage: req.body.customMessage,
      category: req.body.category,
      user: req.params.id,
      model: req.body.model
    });
    return res.status(200).json(personalRecommendation);
  } catch (err) {
    return next(err);
  }
};

exports.getPersonalRecommendations = async function(req, res, next) {
  try {
    let userId = req.params.id
    let personalRecommendations = await db.PersonalRecommendation.find({
      recipient: userId
    }).populate("sender", {
      username: true,
      profileImageUrl: true
    }).populate("itemId")
    return res.status(200).json(personalRecommendations)
  } catch (err) {
    return next(err)
  }
}

exports.deletePersonalRecommendation = async function(req, res, next) {
  try {
    await db.PersonalRecommendation.deleteOne({
      _id: req.params.personalRecommendation_id
    })
    return res.status(200).json('deleted');
  } catch (err) {
    return next(err);
  }
}
