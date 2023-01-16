import React, { useEffect } from 'react'
import styled from "styled-components"
import { useState } from 'react'
import api from "../api"
import { useParams, Link } from "react-router-dom"
import styles from "./Post.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(far)
library.add(fas)

const Container = styled.div`
  min-height: 75vh;
  max-width: 100vw;
  background-image: linear-gradient(to bottom right, black, #202020);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: whitesmoke;
  padding: 40px;  
`

const ContainerP = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 330px;
  @media(min-width: 800px){
    min-width: 700px;
  }
`

const Titulo = styled.p`
  font-weight: bold;
  font-size: 35px;
  margin-bottom: 0px;
`

const Autor = styled.p`
  font-style: italic;
  font-size: 20px;
  margin-bottom: 0px;
`

const LikesContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  margin-top: 10px;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  margin-bottom: -40px;

`

const Comentarios = styled.p`
  font-size: 25px;
  @media(min-width: 800px){
    min-width: 700px;
  }
`

const ContainerC = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -20px;
  min-width: 330px;
  @media(min-width: 800px){
    min-width: 700px;
  }
`

const ContainerC2 = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid whitesmoke;
`

const Name = styled.p`
  font-style: italic;
`

const Comment = styled.p`
  font-weight: bold;
  word-wrap: break-word;
  margin-top: -20px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  font-weight: bold;
  margin-top: 30px;
`

const Input = styled.input`
  margin-bottom: 30px;
  background-color: black;
  border: none;
  border-bottom: 1px solid #d3d2d2;
  padding: 15px 0;
  padding-left: 7px;
  padding-right: 80px;
  margin-top: 20px;
  color: whitesmoke;
  font-size: 20px;
  outline-color: ${props => props.theme.colors.bgfooterday};
  @media(min-width: 800px){
    min-width: 700px;
  }
`

const Btn = styled.input`
  background-color: ${props => props.theme.colors.bgfooterday};
  padding: 18px 0;
  border-radius: 10px;
  margin: 20px 0;
  font-size: 20px;
  cursor: pointer;
  @media(min-width: 800px){
    min-width: 700px;
  }
`

const Frase = styled.p`
  margin-top: -20px;
  border-bottom: 1px solid whitesmoke;
  padding: 20px 0;
  padding-bottom: 30px;
  @media(min-width: 800px){
    min-width: 700px;
  }
`

const Post = () => {
  const [post, setPost] = useState()
  const [comment, setComment] = useState()
  const [user, setUser] = useState()
  const idParams = useParams()
  const id = idParams.id
  const token = localStorage.getItem("token")
  
  useEffect(() => {

    api.get(`http://localhost:5000/post/${id}`, {
      headers: {
        "authorization": `Bearer ${token}`,
      }
    }).then(res => {
      setPost(res.data.post)
    })
      .catch(err => console.log(err.response.data.erro))

  }, [post])

  useEffect(() => {
    api.get("http://localhost:5000/user", {
      headers: {
        "authorization" : `Bearer ${token}`
      }
    }).then(res => setUser(res.data.id))
      .catch(err => console.log(err.response.data.erro))
  },[])

  const handleLike = async (id) => {
    await api.put(`http://localhost:5000/likes/${id}`, null, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    }).then(res => console.log(res.data.updatedPost))
      .catch(err => console.log(err.response.data.erro))
  }

  const handleNoLike = async (id) => {
    await api.put(`http://localhost:5000/undonelike/${id}`, null, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    }).then(res => console.log(res.data.updatedPost))
      .catch(err => console.log(err.response.data.erro))
  }

  const handleDislike = async (id) => {
    await api.put(`http://localhost:5000/dislikes/${id}`, null, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    }).then(res => console.log(res.data.updatedPost))
      .catch(err => console.log(err.response.data.erro))
  }

  const handleNoDislike = async (id) => {
    await api.put(`http://localhost:5000/undonedislike/${id}`, null, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    }).then(res => console.log(res.data.updatedPost))
      .catch(err => console.log(err.respose.data.erro))
  }  

  const handleSubmit = async (e) => {
    e.preventDefault()

    const commentPost = {
      comment: comment
    }

    await api.post(`http://localhost:5000/post/comment/${id}`, commentPost , {
      headers: {
        "Content-Type" : "application/json",
        "authorization" : `Bearer ${token}`
      }
    }).then(res => setComment(res.data.updatePost))
      .catch(err => console.log(err.response.data.erro))
    
    setComment("")
  }

  return (
    <Container>
        {post&& 
        <ContainerP>
          <Titulo>{post.title}</Titulo>
          <Autor>autor: {post.userName}</Autor>
          <LikesContainer>
            {post.likes.includes(user) ? 
            (<IconContainer>
              <FontAwesomeIcon onClick={() => handleNoLike(post._id)} className={styles.icone} icon="fa-solid fa-thumbs-up"/> <p>{post.likes.length} likes</p>
            </IconContainer>) : 
            (<IconContainer>
              <FontAwesomeIcon onClick={() => handleLike(post._id)} className={styles.icone} icon="fa-regular fa-thumbs-up"/> <p>{post.likes.length} likes</p>
            </IconContainer>)}
            {post.dislikes.includes(user) ? 
            (<IconContainer>
              <FontAwesomeIcon onClick={() => handleNoDislike(post._id)} className={styles.icone} icon="fa-solid fa-thumbs-down"/> <p>{post.dislikes.length} dislikes</p>
            </IconContainer>) :
            (<IconContainer>
              <FontAwesomeIcon onClick={() => handleDislike(post._id)} className={styles.icone} icon="fa-regular fa-thumbs-down"/> <p>{post.dislikes.length} dislikes</p>
            </IconContainer>)}
          </LikesContainer>
          <Comentarios>Comentários:</Comentarios>
          {post.comments.length == 0&& <Frase>Ninguém comentou neste post!</Frase>}
          <ContainerC>
            {post.comments.map(comment => (
              <Link to={`/post/comment/${comment._id}`}>
                <ContainerC2>
                  <Name>{comment.name}:</Name>
                  <Comment>{comment.comment}</Comment>
                </ContainerC2>
              </Link>
            ))}
          </ContainerC>
        </ContainerP>}
        <Form onSubmit={handleSubmit}>
            <Label>
                Comentar: 
                <Input type="text" placeholder="Digite sua resposta" value={comment} onChange={(e) => setComment(e.target.value)}/>
            </Label>
            <Btn type="submit" value="Comentar"/>
        </Form>
        <Link to="/forum" className={styles.back}>Voltar</Link>
    </Container>
  )
}

export default Post