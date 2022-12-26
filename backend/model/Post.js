const mongoose = require("../db/conn")
const { Schema } = mongoose

const Comment = mongoose.model("Comment", new Schema({
    name: { type: String },
    comment: { type: String },
    likes: { type: Array },
    dislikes: { type: Array },
    postId: mongoose.ObjectId,
    reply: { type: Array }
}))

const Post = mongoose.model("Post", new Schema({
    title: { type: String },
    comments: { type: Array },
    likes: { type: Array },
    dislikes: { type: Array },
    userName: { type: String },
    userId: mongoose.ObjectId
},{
    timestamps: true
}))

module.exports = {Post, Comment}