import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import styles from "./Register.module.css"
import { Link } from "react-router-dom"
import api from "../api"
import { useNavigate } from 'react-router-dom' 

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
  margin-top: 10px;
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
  cursor: pointer;
  @media(min-width: 800px){
    min-width: 700px
  }
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
  @media(min-width: 800px){
    min-width: 700px
  }
  
`
const Erro = styled.p`
  text-align: center;
`

const Register = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [error, setError] = useState()
  const navigate = useNavigate()
  const [token, setToken] = useState()
  const [userName, setUserName] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }

      await api.post("http://localhost:5000/register", user, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => { 
      setToken(res.data.token) 
      setUserName(res.data.user.name)
      })
      .catch(err => setError(err.response.data.erro))
    
  }

  useEffect(() => {
      
    if(token){
      localStorage.setItem("token", token)
      localStorage.setItem("name", userName) 
      navigate("/dashboard") 
    }
  
  }, [handleSubmit])
  
  return (
    <div>
    <Container>
      <Titulo>De torcedor para torcedor. Galo!</Titulo>
      {error&& <ErroContainer>
        <Erro>{error}</Erro>
        </ErroContainer>}
      <Form onSubmit={handleSubmit}>
        <Label>
          Nome:
          <Input type="text" placeholder='Digite o seu nome' value={name} onChange={(e) => setName(e.target.value)}/>
        </Label>
        <Label>
          Email:
          <Input type="email" placeholder='Digite o seu email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </Label>
        <Label>
          Senha:
          <Input type="password" placeholder='Digite a sua senha' value={password} onChange={(e) => setPassword(e.target.value)} />
        </Label>
        <Label>
          Confirme sua senha:
          <Input type="password" placeholder='Confirme sua senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        </Label>
        <Btn type="submit" value="Registre-se" />
      </Form>
      <p>Já é usuário? Faça o <Link className={styles.link} to={"/login"}>login</Link></p>
    </Container>
    </div>
  )
}

export default Register