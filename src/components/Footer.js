import React from 'react'
import styled from "styled-components"
import adidas from "../assets/imgs/logoadidas.png"
import mrv from "../assets/imgs/mrvlogo.png"
import betano from "../assets/imgs/logobetano.png"

const Foot = styled.div`
    min-height: 15vh;
    min-width: 100vw;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 15vh;
  max-width: 100vw;
  padding: 0 20px;
  background-color: ${props => props.theme.colors.bgfooterday};
`

const Patrocinadores = styled.img`
  max-height: 80px;
  max-width: 80px;
  margin-right: 15px;

`

const Patrocinadores1 = styled.img`
  max-height: 120px;
  max-width: 125px;
  

`

const Patrocinadores2 = styled.img`
  max-height: 120px;
  max-width: 125px;
  margin-left: 15px;
  

`

const Footer = () => {
  return (
    <Foot>
      <Container>
        <Patrocinadores src={adidas} alt="Logo do fornecedor esportivo Adidas"/>
        <Patrocinadores1 src={mrv} alt="Logo da patrocinadora Construtora MRV"/>
        <Patrocinadores2 src={betano} alt="Logo da patrocinadora Betano"/>
      </Container>
    </Foot>
  )
}

export default Footer