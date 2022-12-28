import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom"
import styled from "styled-components"
import api from "../api"
import styles from "./CriarPost.module.css"

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
  margin-bottom: 55px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 20px;
`

const Input = styled.input`
  margin-bottom: 30px;
  background-color: black;
  border: none;
  border-bottom: 1px solid #d3d2d2;
  padding: 15px 0;
  padding-left: 7px;
  padding-right: 80px;
  margin-top: 30px;
  color: whitesmoke;
  font-size: 20px;
  outline-color: ${props => props.theme.colors.bgfooterday};
`

const Btn = styled.input`
  background-color: ${props => props.theme.colors.bgfooterday};
  padding: 18px 0;
  border-radius: 10px;
  margin: 20px 0;
  font-size: 20px;
`

const ErroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  min-height: 8vh;
  background-color: #eb3535;
  border-radius: 10px;
  margin-bottom: 55px;
  padding: 5px 20px;
  
`
const Erro = styled.p`
  text-align: center;
`

const CriarPost = () => {
    const [title, setTitle] = useState()
    const [erro, setErro] = useState()
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const post = {
          title: title
        }
      
        await api.post("http://localhost:5000/dashboard/createpost", post, {
          headers: {
          "Content-Type" : "application/json",
          "authorization" : `Bearer ${token}`
          }
        }).then(res => {
        
        setTitle(res.data.post)
        navigate("/dashboard")
        setErro("")
        
        }).catch(err => setErro(err.response.data.erro))
    
    }

  return (
    <Container>
        <Titulo>Crie seu post</Titulo>
        {erro&& 
          <ErroContainer>
            <Erro>{erro}</Erro>
          </ErroContainer>}
        <Form onSubmit={handleSubmit}>
            <Label>
                No que você está pensando?
                <Input type="text" placeholder="Digite seu post" value={title} onChange={e => setTitle(e.target.value)}/>
                <Btn type="submit" value="Criar Post" />
            </Label>
        </Form>
        <Link to="/dashboard" className={styles.back}>Voltar</Link>
    </Container>
  )
}

export default CriarPost