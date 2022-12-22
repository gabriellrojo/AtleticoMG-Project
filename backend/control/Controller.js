const User = require("../model/User")
const Post = require("../model/Post")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports = class Controller {
    
    static register = async (req, res) => {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword

        if(!name){
            res.status(411).json({"erro": "O nome é obrigatório"})
            return
        }

        if(name.length <= 2){
            res.status(422).json({"erro": "O nome precisa ter no mínimo 3 caractéres"})
            return
        }

        if(!email){
            res.status(411).json({"erro": "O email é obrigatório"})
            return
        }

        if(!password){
            res.status(411).json({"erro": "A senha deve ser preenchida"})
            return
        }

        if(password.length < 4 && password.length > 8){
            res.status(422).json({"erro": "A senha deve ter entre 4 e 8 caractéres"})
            return
        }

        if(!password.match(/(?=.*[A-z])(?=.*[0-9])(?=.*[@,!,&,%,$,*,%)])/)){
            res.status(422).json({"erro": "A senha deve conter pelo menos 1 caractére especial e um número"})
            return
        }

        if(!confirmPassword){
            res.status(411).json({"erro": "Você deve confirmar a senha"})
            return
        }

        if(password !== confirmPassword){
            res.status(422).json({"erro": "As senhas devem ser iguais"})
            return
        }

        const userExist = await User.findOne({email: email});

        if(userExist){
            res.status(422).json({"erro": "Usuário já cadastrado"})
            return
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const createUser = new User ({
            name: name,
            email: email,
            password: hashedPass
        })

        const newUser = await createUser.save()
        const id = newUser._id

        const token = jwt.sign({ id }, "secret", {
            expiresIn: "7d"
        })

        res.status(201).json({
            user: newUser,
            token: token
        })
    }
    
    static login = async (req, res) => {
        const email = req.body.email
        const password = req.body.password

        if(!email){
            res.status(411).json({"erro": "O campo do email deve ser preenchido"})
            return
        }

        if(!password){
            res.status(411).json({"erro": "O campo da senha deve ser preenchido"})
            return
        }

        const userExist = await User.findOne({email: email})

        if(!userExist){
            res.status(422).json({"erro": "Usuário não cadastrado"})
            return
        }

        const passwordMatch = await bcrypt.compare(password, userExist.password)

        if(!passwordMatch){
            res.status(422).json({"erro": "Senha incorreta"})
            return
        }

        const id = userExist._id
        const token = jwt.sign({id}, "secret", {
            expiresIn: "7d"
        })

        res.status(201).json({
            user: userExist,
            token: token
        })
    }

    static dashboard = async (req, res) => {
      const bearerToken = req.headers.authorization
      const split = bearerToken.split(" ")
      const token = split[1]
      const decoded = jwt.verify(token, "secret")
      const id = decoded.id
      

      const posts = await Post.find({userId: id})

      res.status(201).json({
          posts: posts
      })
    }

    static createPost = async (req, res) => {
        const title = req.body.title
        const bearerToken = req.headers.authorization
        const split = bearerToken.split(" ")
        const token = split[1]
        const decoded = jwt.verify(token, "secret")
        const id = decoded.id
        const user = await User.findOne({_id: id})

        if(!title){
            res.status(411).json({"erro": "O campo deve ser preenchido"})
            return
        }

        if(title.length < 5){
            res.status(422).json({"erro": "O titulo precisa ter no mínimo 3 caractéres"})
            return
        }

        const newPost = new Post({
            title: title,
            userName: user.name,
            userId: user._id
        })

        const post = await newPost.save()

        res.status(201).json({
            post: post
        })
    }
}