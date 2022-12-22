const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const bearerToken = req.headers.authorization
    if(!bearerToken){
        res.status(401).json({"erro": "Acesso negado"})
        return
    }
    const split = bearerToken.split(" ")
    const token = split[1]

    if(token){
       jwt.verify(token, "secret")
       next()
        
    }
}

module.exports = auth