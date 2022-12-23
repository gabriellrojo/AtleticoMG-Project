const mongoose = require("../db/conn")
const { Schema } = mongoose

const Post = mongoose.model("Post", new Schema({
    title: { type: String },
    likes: { type: Array },
    dislikes: { type: Array },
    comments: { type: Array },
    userName: { type: String },
    userId: mongoose.ObjectId,
},{
    timestamps: true
}))

module.exports = Post