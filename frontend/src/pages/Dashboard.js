import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import api from "../api"
import styled from "styled-components"
import styles from "./Dashboard.module.css"

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
`

const Dashboard = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState()

    const token = localStorage.getItem("token")
    const name = localStorage.getItem("name")
    if(!token){
        navigate("/login")
    }

    useEffect(() => {

      api.get("http://localhost:5000/dashboard", {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      }
    }).then(res => {
      setPosts(res.data.posts)
      console.log(res.data)})
      .catch(err => console.log(err))

    },[])

  return (
    <Container>
        <Titulo>Seja bem vindo: {name}</Titulo>
        {posts&& posts.length == 0&& <Frase>Você ainda não tem nenhum post publicado</Frase>}
        {posts&& posts.map(post => (
          <ContainerP>
            <TituloP>{post.title}</TituloP>
            <Autor>autor: {post.userName}</Autor>
          </ContainerP>
        ))}
        <Link to="/dashboard/createpost" className={styles.btn}> Criar post </Link>
    </Container>
  )
}

export default Dashboard