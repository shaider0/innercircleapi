const db = require("../models");

exports.getFriends = async function(req, res, next) {
  try {
    let user = req.params.id

    let friendsSent = await db.FriendRequest.find({
      requestor: user,
      status: 2
    }).populate("recipient", {
      username: true,
      profileImageUrl: true
    });

    let friendsReceived = await db.FriendRequest.find({
      recipient: user,
      status: 2
    }).populate("requestor", {
      username: true,
      profileImageUrl: true
    });

    let friendPropertiesSent = friendsSent.map(friend => {
      return {
        id: friend.recipient._id,
        username: friend.recipient.username,
        profileImageUrl: friend.recipient.profileImageUrl
      }
    })

    let friendPropertiesReceived = friendsReceived.map(friend => {
      return {
        id: friend.recipient._id,
        username: friend.requestor.username,
        profileImageUrl: friend.requestor.profileImageUrl
      }
    })

    let friends = [...friendPropertiesSent, ...friendPropertiesReceived]

    // if (!friends) {
    //   return res.status(200).json({message: "friends not found"})
    // }

    return res.status(200).json(friends);
  } catch (err) {
    return next(err);
  }
};
