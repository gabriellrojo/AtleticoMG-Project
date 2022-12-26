import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./Login.module.css"
import { useState } from 'react'
import api from "../api"

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
  margin-bottom: 75px;
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

const Login = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [token, setToken] = useState()
  const [error, setError] = useState()
  const [userName, setUserName] = useState()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
      email: email,
      password: password
    }

    await api.post("http://localhost:5000/login", user, {
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
    <Container>
      <Titulo>Faça o login e discuta o Galo.</Titulo>
      {error&& <ErroContainer>
        <Erro>{error}</Erro>
        </ErroContainer>}
      <Form onSubmit={handleSubmit}>
        <Label>
          Email:
          <Input type="email" placeholder='Digite o seu email' value={email} onChange={e => setEmail(e.target.value)}/>
        </Label>
        <Label>
          Senha:
          <Input type="password" placeholder='Digite a sua senha' value={password} onChange={e => setPassword(e.target.value)}/>
        </Label>
        <Btn type="submit" value="Entrar" />
      </Form>
      <p>Não é usuário? <Link className={styles.link} to={"/register"}>Registre-se</Link></p>
    </Container>
  )
}

export default Login