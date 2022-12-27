const User = require("../model/User")
const { Post } = require("../model/Post")
const { Comment } = require("../model/Post")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { post } = require("../routes/routes")
const { trusted } = require("mongoose")


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

    static forum = async (req, res) => {

        const posts = await Post.find()

        if(!posts){
            res.status(404).json({"erro" : "Ainda não há nenhum post"})
            return
        }

        res.status(200).json({
            posts: posts
        })

    }

    static likeOnPost = async (req, res) => {
        const id = req.params.id 
        const post = await Post.findById({_id: id})
        const bearerToken = req.headers.authorization
        const split = bearerToken.split(" ")
        const token = split[1]
        const decoded = jwt.verify(token, "secret")
        const idUser = decoded.id
        const user = await User.findById({_id: idUser})
        const userId = user._id
        const userIdToString = userId.toString()

        if(!user){
            res.status(422).json({"erro": "Usuário não encontrado"})
            return
        }
        
        if(!post){
            res.status(404).json({"erro": "Post não encontrado"})
            return
        }

        if(post.likes.includes(userIdToString)){
            res.status(422).json({"erro": "Você já curtiu essa postagem"})
            return
        }

        if(post.dislikes.includes(userId)){
            res.status(422).json({"erro": "Retire o dislike para poder curtir essa postagem"})
            return
        }

        post.likes.push(userIdToString)

        const updatedPost = await Post.findByIdAndUpdate({_id: id}, {$set: post}, {new: true})

        res.status(201).json({
            updatedPost: updatedPost
        })
    }

    static undoneLike = async (req, res) => {
        const id = req.params.id
        const post = await Post.findById({_id: id})

        const bearerToken = req.headers.authorization
        const split = bearerToken.split(" ")
        const token = split[1]

        const decoded = jwt.verify(token, "secret")
        const userId = decoded.id

        const user = await User.findById({_id: userId})
        
        if(!user){
            res.status(422).json({"erro": "Usuário não encontrado"})
            return
        }

        if(!post){
            res.status(422).json({"erro": "Post não encontrado"})
            return
        }

        if(!post.likes.includes(userId)){
            res.status(422).json({"erro": "Você não pode descurtir pois não curtiu"})
            return
        }

        post.likes = post.likes.filter((id) => id !== userId)
        
        const updatedPost = await Post.findByIdAndUpdate({_id: id}, {$set: post}, {new: true})
        
        res.status(201).json({
            updatedPost: updatedPost
        })
    }

    static dislike = async (req, res) => {
        const id = req.params.id
        const post = await Post.findById({_id: id})
        const bearerToken = req.headers.authorization
        const split = bearerToken.split(" ")
        const token = split[1]
        const decoded = jwt.verify(token, "secret")
        const userId = decoded.id
        //const userIdString = userId.toString()

        if(!post){
            res.status(404).json({"erro": "Não foi encontrado nenhum post"})
            return
        }

        if(!userId){
            res.status(404).json({"erro": "Não foi encontrado nenhum usuário"})
            return
        }

        if(post.likes.includes(userId)){
            res.status(422).json({"erro": "Retire seu like para poder dar dislike no post"})
            return
        }

        post.dislikes.push(userId)

        const updateDislikes = await Post.findByIdAndUpdate({_id: id}, {$set: post}, {new: true})

        res.status(201).json({
            updatedPost: updateDislikes
        }) 
    }

    static undoneDislike = async (req, res) => {
        const id = req.params.id
        const post = await Post.findById({_id: id})
        const bearerToken = req.headers.authorization
        const split = bearerToken.split(" ")
        const token = split[1]
        const decoded = jwt.verify(token, "secret")
        const userId = decoded.id
        
        if(!post){
            res.status(404),json({"erro": "Não foi encontrado nenhum post"})
            return
        }

        if(!userId){
            res.status(404).json({"erro": "Não foi encontrado nenhum usuário"})
            return
        }
        
        if(!post.dislikes.includes(userId)){
            res.status(422).json({"erro": "Você não pode retirar o dislike por não deu dislike no post"})
            return
        }

        post.dislikes = post.dislikes.filter(id => id !== userId)

        const updatedPost = await Post.findByIdAndUpdate({_id: id}, {$set: post}, {new: true})

        res.status(201).json({
            updatedPost: updatedPost
        })
    }

    static getPost = async (req, res) => {
        const id = req.params.id

        const post = await Post.findById({_id: id})
        const comments = post.comments

        if(!post){
            res.status(404).json({"erro": "Post não encontrado"})
            return
        }

        res.status(200).json({
            post: post,
            comments: comments
        })
    }

    static comments = async (req, res) => {
        const comment = req.body.comment
        const id = req.params.id
        const post = await Post.findById({_id: id})
        const bearerToken = req.headers.authorization
        const split = bearerToken.split(" ")
        const token = split[1]
        const decoded = jwt.verify(token, "secret")
        const userId = decoded.id
        const user = await User.findById({_id: userId})

        const novoComment = new Comment({
            name: user.name,
            userId: userId,
            comment: comment,
            postId: id
        })

        const newComment = await novoComment.save()

        post.comments.push(newComment)

        const updatedPost = await Post.findByIdAndUpdate({_id: id}, {$set: post}, {new: true})

        res.status(201).json({
            updatePost: updatedPost
        })

    }

    static getComment = async (req, res) => {
        const id = req.params.id
        const comment = await Comment.findById({_id: id})

        if(!comment){
            res.status(404).json({"erro": "Comentário não encontrado"})
            return
        }

        res.status(201).json({
            comment: comment
        })

    }

    static likeOnComment = async (req, res) => { 
        const id = req.params.id
        const bearerToken = req.headers.authorization
        const split = bearerToken.split(" ")
        const token = split[1]
        const decoded = jwt.verify(token, "secret")
        const userId = decoded.id

        const comment = await Comment.findById({_id: id})

        if(!comment){
            res.status(404).json({"erro": "Comentário não encontrado"})
            return
        }

        if(comment.dislikes.includes(userId)){
            res.status(422).json({"erro": "Você precisa retirar o dislike para curtir"})
            return
        }

        comment.likes.push(userId)

        const updateComment = await Comment.findByIdAndUpdate({_id: id}, {$set: comment}, {new: true})

        res.status(201).json({
            updateComment: updateComment
        })
    }

    static dislikeOnComment = async (req, res) => {
        const id = req.params.id
        
        const bearerToken = req.headers.authorization
        const split = bearerToken.split(" ")
        const token = split[1]
        const decoded = jwt.verify(token, "secret")
        const userId = decoded.id

        const comment = await Comment.findById({_id: id})

        if(!comment){
            res.status(404).json({"erro": "Comentário não encontrado"})
            return
        }

        if(comment.likes.includes(userId)){
            res.status(422).json({"erro": "Você precisa retirar o like para descurtir"})
            return
        }

        comment.dislikes.push(userId)

        const updateComment = await Comment.findByIdAndUpdate({_id: id}, {$set: comment}, {new: true})

        res.status(201).json({
            updateComment: updateComment
        })
    }

    static unlikeComment = async (req, res) => {
        const id = req.params.id

        const bearerToken = req.headers.authorization
        const split = bearerToken.split(" ")
        const token = split[1]
        const decoded = jwt.verify(token, "secret")
        const userId = decoded.id

        const comment = await Comment.findById({_id: id})

        if(!comment){
            res.status(404).json({"erro": "Comentário não encontrado"})
            return
        }

        if(!comment.likes.includes(userId)){
            res.status(422).json({"erro": "A postagem não foi curtida"})
            return
        }

        comment.likes = comment.likes.filter(id => id !== userId)

        const updateComment = await Comment.findByIdAndUpdate({_id: id}, {$set: comment}, {new: true})

        res.status(201).json({
            updateComment: updateComment
        })
    }

    static undislikeComment =  async (req, res) => {
        const id = req.params.id
        
        const bearerToken = req.headers.authorization
        const split = bearerToken.split(" ")
        const token = split[1]
        const decoded = jwt.verify(token, "secret")
        const userId = decoded.id

        const comment = await Comment.findById({_id: id})

        if(!comment){
            res.status(404).json({"erro": "Comentário não encontrado"})
            return
        }

        if(!comment.dislikes.includes(userId)){
            res.status(422).json({"erro": "Você não descurtiu esse post"})
            return
        }

        comment.dislikes = comment.dislikes.filter(id => id !== userId)

        const updateComment = await Comment.findByIdAndUpdate({_id: id}, {$set: comment}, {new: true})

        res.status(201).json({
            updateComment: updateComment
        })
    }

    static addReply = async (req, res) => {
        const id = req.params.id
        const reply = req.body.reply
        const bearerToken = req.headers.authorization
        const split = bearerToken.split(" ")
        const token = split[1]
        const decoded = jwt.verify(token, "secret")
        const userId = decoded.id

        const user = await User.findById({_id: userId})
        const comment = await Comment.findById({_id: id})
        const userName = user.name

        if(!comment){
            res.status(404).json({"erro": "Comentário não encontrado"})
            return
        }

        const replyComment = {
            name: userName,
            reply: reply
        }

        comment.replies.push(replyComment)

        const updateComment = await Comment.findByIdAndUpdate({_id: id}, {$set: comment}, {new: true})

        res.status(201).json({
            updateComment: updateComment
        })  

    } 
}