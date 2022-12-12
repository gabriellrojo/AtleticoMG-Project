const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://atleticomg-users:caca007nova@cluster0.bcrgx8m.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log(`conectado ao Mongo Atlas database`))
.catch(err => console.log(`houve um erro e não foi possível conectar: ${err}`))

module.exports = mongoose