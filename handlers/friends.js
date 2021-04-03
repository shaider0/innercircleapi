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
        id: friend.requestor._id,
        username: friend.requestor.username,
        profileImageUrl: friend.requestor.profileImageUrl
      }
    })

    let friends = [...friendPropertiesSent, ...friendPropertiesReceived]
    let sortedFriends = friends.sort((a, b) => (a.username > b.username) ? 1 : -1)

    return res.status(200).json(sortedFriends);
  } catch (err) {
    return next(err);
  }
};

exports.deleteFriend = async function(req, res, next) {
  try {
    let foundFriendRequest = await db.FriendRequest.find( { $or: [ { requestor: req.params.id, recipient: req.params.friendId }, {requestor: req.params.friendId, recipient: req.params.id } ] } )

    let deleted = await db.FriendRequest.deleteOne({
      _id: foundFriendRequest[0]._id
    })

    await db.User.update({
    _id: req.params.id
    }, {
      $pull: {friends: req.params.friendId}
    })

    await db.User.update({
    _id: req.params.friendId
    }, {
      $pull: {friends: req.params.id}
    })

    return res.status(200).json(foundFriendRequest);
  } catch (err) {
    return next(err);
  }
}
