const db = require("../models");
const mongoose = require('mongoose')

exports.sendPersonalRecommendation = async function(req, res, next) {
  try {
    let recipient = await db.User.find({
      username: req.body.recipientUsername
    })

    console.log('XXXXX')
    console.log(req.params.id)
    console.log(recipient[0]._id)
    console.log(req.body.item)

    let personalRecommendation = await db.PersonalRecommendation.create({
      sender: req.params.id,
      recipient: recipient[0]._id,
      item: req.body.item,
      category: req.body.category,
      user: req.params.id
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
    })
    return res.status(200).json(personalRecommendations)
  } catch (err) {
    return next(err)
  }
}
