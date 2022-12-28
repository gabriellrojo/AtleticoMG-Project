import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom" 
import styled from "styled-components"
import styles from "./Forum.module.css"
import api from '../api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas)
library.add(far)

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

const Titulo = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`

const Frase = styled.h1`
  text-align: center;
  font-weight: normal;
  font-size: 25px;
`

const ContainerP = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid whitesmoke;
  min-width: 330px;
`

const TituloP = styled.p`
  font-weight: bold;
  font-size: 35px;
  margin-bottom: 0px;
`

const Autor = styled.p`
  font-style: italic;
  font-size: 20px;
  margin-bottom: 0px;
`
const Number = styled.span`
  font-weight: bold;
`

const LikesContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  margin-top: -15px;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;

`

const Forum = () => {
  const [posts, setPosts] = useState()
  const [user, setUser] = useState()
  const token = localStorage.getItem("token")

  useEffect(() => {
    api.get("http://localhost:5000/posts", {
      headers: {
        "authorization" : `Bearer ${token}`
      }
    }).then(res => setPosts(res.data.posts))
      .catch(err => console.log(err.response.data.erro))
  
  }, [posts])

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

  return (
    <Container>
        <Titulo>Vamos GALO!</Titulo>
        {posts&& posts.length === 0&&
          <Frase>Ainda não há nenhum post publicado!</Frase>
        }
        {posts&& posts.map(post => (
          <ContainerP>
            <Link to={`/post/${post._id}`}>
              <TituloP>{post.title}</TituloP>
                <Autor>autor: {post.userName}</Autor>
                <p>Comentários: <Number>{post.comments.length}</Number></p>
            </Link>
            <LikesContainer>
              {post.likes.includes(user) ? 
              (<IconContainer>
                <FontAwesomeIcon onClick={() => handleNoLike(post._id)} className={styles.icone} icon="fa-solid fa-thumbs-up" /> <p>{post.likes.length} likes</p>
              </IconContainer>) :
              (<IconContainer>
                <FontAwesomeIcon onClick={() => handleLike(post._id)} className={styles.icone} icon="fa-regular fa-thumbs-up" /> <p>{post.likes.length} likes</p>
              </IconContainer>)}
            {post.dislikes.includes(user) ? 
            (<IconContainer>
              <FontAwesomeIcon onClick={() => handleNoDislike(post._id)} className={styles.icone} icon="fa-solid fa-thumbs-down" /> <p>{post.dislikes.length} dislikes</p>
            </IconContainer>) :
            (<IconContainer>
              <FontAwesomeIcon onClick={() => handleDislike(post._id)} className={styles.icone} icon="fa-regular fa-thumbs-down" /> <p>{post.dislikes.length} dislikes</p>
            </IconContainer>)}
            </LikesContainer>
          </ContainerP>
        ))}
    </Container>
  )
}

export default Forum