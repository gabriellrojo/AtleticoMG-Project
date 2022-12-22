const express = require("express")
const cors = require("cors")
const server = express()
const route = require("./routes/routes")

server.use(express.json())
server.use(express.urlencoded({
    extended: true
}))
server.use(cors())
server.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

server.use("/", route)

server.listen(5000, () => {
    console.log("Servidor rodando na porta 5000")
})