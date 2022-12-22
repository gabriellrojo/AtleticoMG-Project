const express = require("express")
const Controller = require("../control/Controller")
const route = express.Router()
const auth = require("../middleware/auth")

route.post("/register", Controller.register)
route.post("/login", Controller.login)
route.get("/dashboard", auth, Controller.dashboard)
route.post("/dashboard/createpost", auth, Controller.createPost)

module.exports = route