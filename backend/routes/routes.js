const express = require("express")
const Controller = require("../control/Controller")
const route = express.Router()

route.get("/register", Controller.register)

module.exports = route