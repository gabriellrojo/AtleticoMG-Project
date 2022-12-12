const mongoose = require("../db/conn.js")
const { Schema } = mongoose

const Post = mongoose.model("Post", new Schema({
    title: { type: String },
    likes: { type: Array },
    comments: { type: Array },
    userName: { type: String },
    userId: mongoose.ObjectId,
},{
    timestamps: true
}))

module.exports = Post