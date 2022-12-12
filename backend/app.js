const express = require("express")
const cors = require("cors")
const server = express()

server.use(express.json())
server.use(express.urlencoded({
    extended: false
}))
server.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

server.listen(5000, () => {
    console.log("Servidor rodando na porta 5000")
})