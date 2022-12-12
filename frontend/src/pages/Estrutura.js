import React from 'react'
import styled from "styled-components"
import arena from "../assets/imgs/arena.jpeg"
import ct from "../assets/imgs/cidade.jpeg"
import lourdes from "../assets/imgs/lourdes.jpg"

const Container = styled.div`
    padding: 40px;
    background-image: linear-gradient(to bottom right, white, #d3d2d2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Titulo = styled.h1`
    margin-bottom: 30px;
`

const Arena = styled.img`
    max-width: 340px;
    max-height: 400px;
    margin-top: 15px;
    margin-bottom: 30px;
    padding-bottom: 35px;
    border-bottom: 1px solid black;
`

const Cidade = styled.img`
    max-width: 340px;
    max-height: 400px;
    margin-top: 15px;
    margin-bottom: 30px;
    padding-bottom: 35px;
    border-bottom: 1px solid black;
`

const Sede = styled.img`
    width: 340px;
    height: 250px;
    margin-top: 15px;
    margin-bottom: 30px;
    padding-bottom: 35px;
    border-bottom: 1px solid black;
`

const Estrutura = () => {
  return (
    <Container>
        <Titulo>Uma vez até morrer!</Titulo>
        <ul>
            <li>
                <h2>Arena MRV</h2>
                <Arena src={arena} alt="Arena MRV"/>
            </li>
            <li>
                <h2>Cidade do Galo</h2>
                <Cidade src={ct} alt="Cidade do Galo"/>
            </li>
            <li>
                <h2>Sede de Lourdes</h2>
                <Sede src={lourdes} alt="Sede de Lourdes"/>
            </li>
        </ul>
    </Container>
  )
}

export default Estrutura