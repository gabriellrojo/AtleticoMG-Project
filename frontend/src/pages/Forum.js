import React, { useEffect } from 'react'
import styled from "styled-components"
import { useState } from 'react'
import api from '../api'

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

const Forum = () => {
  const [posts, setPosts] = useState()
  const token = localStorage.getItem("token")

  useEffect(() => {
    api.get("http://localhost:5000/posts", {
      headers: {
        "Content-Type" : "application/json",
        "authorization" : `Bearer ${token}`
      }
    }).then(res => setPosts(res.data.posts))
      .catch(err => console.log(err.response.data.erro))
  
  }, [posts])

  return (
    <Container>
        <h1>Vamos GALO!</h1>
        {posts&& posts.length === 0&&
          <p>Ainda não há nenhum post publicado</p>
        }
        {posts&& posts.map(post => (
          <div>
            <p>{post.title}</p>
            <p>author: {post.userName}</p>
          </div>
        ))}
    </Container>
  )
}

export default Forum