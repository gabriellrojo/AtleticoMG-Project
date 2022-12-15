const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://gabrielrojo:caca007nova@cluster0.xpog6gb.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log(`conectado ao Mongo Atlas database`))
.catch(err => console.log(`houve um erro e não foi possível conectar: ${err}`))

module.exports = mongoose