import React, { useEffect } from 'react'
import styled from "styled-components"
import { useState } from 'react'
import api from "../api"
import { useParams } from "react-router-dom"
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
`

const ContainerC = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -20px;
  min-width: 330px;
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

const Btn = styled.button`
  background-color: ${props => props.theme.colors.bgfooterday};
  padding: 18px 0;
  border-radius: 10px;
  margin: 20px 0;
  font-size: 20px;
  min-width: 330px;
`

const Post = () => {
  const [post, setPost] = useState()
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

  return (
    <Container>
        {post&& 
        <ContainerP>
          <Titulo>{post.title}</Titulo>
          <Autor>autor: {post.userName}</Autor>
          <LikesContainer>
            {post.likes.includes(post.userId) ? 
            (<IconContainer>
              <FontAwesomeIcon onClick={() => handleNoLike(post._id)} className={styles.icone} icon="fa-solid fa-thumbs-up"/> <p>{post.likes.length} likes</p>
            </IconContainer>) : 
            (<IconContainer>
              <FontAwesomeIcon onClick={() => handleLike(post._id)} className={styles.icone} icon="fa-regular fa-thumbs-up"/> <p>{post.likes.length} likes</p>
            </IconContainer>)}
            {post.dislikes.includes(post.userId) ? 
            (<IconContainer>
              <FontAwesomeIcon onClick={() => handleNoDislike(post._id)} className={styles.icone} icon="fa-solid fa-thumbs-up"/> <p>{post.dislikes.length} dislikes</p>
            </IconContainer>) :
            (<IconContainer>
              <FontAwesomeIcon onClick={() => handleDislike(post._id)} className={styles.icone} icon="fa-regular fa-thumbs-down"/> <p>{post.dislikes.length} dislikes</p>
            </IconContainer>)}
          </LikesContainer>
          <Comentarios>Comentários:</Comentarios>
          <ContainerC>
            {post.comments.map(comment => (
              <ContainerC2>
                <Name>{comment.name}:</Name>
                <Comment>{comment.comment}</Comment>
              </ContainerC2>
            ))}
          </ContainerC>
        </ContainerP>}
        <Btn>Comentar</Btn>
    </Container>
  )
}

export default Post