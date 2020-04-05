const db = require("../models");

exports.createPost = async function(req, res, next) {
  try {
    let post = await db.Post.create({
      content: req.body.content,
      imageUrl: req.body.imageUrl,
      user: req.params.id
    })

    let id = post._id

    let foundPost = await db.Post.find({ _id: id })
      .populate("user", {
        username: true,
        profileImageUrl: true
      })

    return res.status(200).json(foundPost);
  } catch (err) {
    return next(err);
  }
}

exports.getPosts = async function(req, res, next) {
  try {
    let userId = req.params.id
    let user = await db.User.findById(userId)
    let friends = user.friends
    friends.push(userId)

    let posts = await db.Post.find({ "user": { "$in": friends } })
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
}

exports.deletePost = async function(req, res, next) {
  try {
    let foundPost = await db.Post.findById(req.params.post_id);
    await db.Post.deleteOne({
      _id: req.params.post_id
    })
    return res.status(200).json(foundPost);
  } catch (err) {
    return next(err);
  }
};

exports.updatePost = async function(req, res, next) {
  try {
    let foundPost = await db.Post.findById(req.params.post_id);
    let updates = req.body
    updates.post = req.body.post
    await foundPost.update(updates);
    let updatedPost = await db.Post.findById(req.params.post_id)
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(updatedPost);
  } catch (err) {
    return next(err);
  }
};
