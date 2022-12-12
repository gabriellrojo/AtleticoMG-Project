import React from 'react'
import styled from "styled-components"
import styles from "./Register.module.css"
import { Link } from "react-router-dom"

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
`

const Btn = styled.input`
  background-color: ${props => props.theme.colors.bgfooterday};
  padding: 18px 0;
  border-radius: 10px;
  margin: 20px 0;
  font-size: 20px;
`

const Register = () => {
  return (
    <div>
    <Container>
      <Titulo>De torcedor para torcedor. Galo!</Titulo>
      <Form>
        <Label>
          Nome:
          <Input type="text" placeholder='Digite o seu nome'/>
        </Label>
        <Label>
          Email:
          <Input type="email" placeholder='Digite o seu email'/>
        </Label>
        <Label>
          Senha:
          <Input type="password" placeholder='Digite a sua senha'/>
        </Label>
        <Label>
          Confirme sua senha:
          <Input type="password" placeholder='Confirme sua senha'/>
        </Label>
        <Btn type="submit" value="Registre-se" />
      </Form>
      <p>Já é usuário? Faça o <Link className={styles.link} to={"/login"}>login</Link></p>
    </Container>
    </div>
  )
}

export default Register