import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import styles from "./Login.module.css"

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

const Login = () => {
  return (
    <Container>
      <Titulo>Faça o login e discuta o Galo.</Titulo>
      <Form>
        <Label>
          Email:
          <Input type="email" placeholder='Digite o seu email'/>
        </Label>
        <Label>
          Senha:
          <Input type="password" placeholder='Digite a sua senha'/>
        </Label>
        <Btn type="submit" value="Entrar" />
      </Form>
      <p>Não é usuário? <Link className={styles.link} to={"/register"}>Registre-se</Link></p>
    </Container>
  )
}

export default Login