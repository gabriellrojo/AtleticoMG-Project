import React from 'react'
import styled from "styled-components"
import adidas from "../assets/imgs/logoadidas.png"
import mrv from "../assets/imgs/mrvlogo.png"
import betano from "../assets/imgs/logobetano.png"
import brahma from "../assets/imgs/logobrahma.png"

const Foot = styled.div`
    position: fixed;
    min-height: 15vh;
    max-width: 100vw;
    background-color: ${props => props.theme.colors.bgfooterday};
`

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 15vh;
  max-width: 100vw;
  animation: patrocinadores 8s linear infinite;

  @keyframes patrocinadores {
    from {
      right: -600px; 
    } to {
      right: 450px;
    }
  }
`

const Patrocinadores = styled.img`
  max-height: 80px;
  max-width: 80px;
  margin-right: 50px;

`

const Patrocinadores1 = styled.img`
  max-height: 120px;
  max-width: 120px;
  margin-right: 50px;

`

const Patrocinadores2 = styled.img` 
  max-height: 100px;
  max-width: 100px;
  margin-right: 50px;
  
`

const Footer = () => {
  return (
    <Foot>
      <Container>
        <Patrocinadores src={adidas} alt="Logo do fornecedor esportivo Adidas"/>
        <Patrocinadores1 src={mrv} alt="Logo da patrocinadora Construtora MRV"/>
        <Patrocinadores1 src={betano} alt="Logo da patrocinadora Betano"/>
        <Patrocinadores2 src={brahma} alt="Logo da patrocinadora Brahma"/>
      </Container>
    </Foot>
  )
}

export default Footer