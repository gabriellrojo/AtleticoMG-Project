import React from 'react'
import { useState } from 'react'
import styled from "styled-components"
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

const CriarPost = () => {
    const [title, setTitle] = useState()
    const token = localStorage.getItem("token")

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
        }).then(res => console.log(res.data))
          .catch(err => console.log(err.response.data))

    }
  return (
    <Container>
        <Titulo>Crie seu post</Titulo>
        <Form onSubmit={handleSubmit}>
            <Label>
                No que você está pensando?
                <Input type="text" placeholder="Digite seu post" value={title} onChange={e => setTitle(e.target.value)}/>
                <Btn type="submit" value="Criar Post" />
            </Label>
        </Form>
    </Container>
  )
}

export default CriarPost