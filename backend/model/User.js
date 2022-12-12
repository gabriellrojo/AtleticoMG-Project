const mongoose = require("../db/conn.js")
const { Schema } = mongoose

const User = mongoose.model("User", new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String }
}, {
    timestamps: true
}))

module.exports = User