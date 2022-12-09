import React from 'react'
import styled from "styled-components"
import rei from "../assets/imgs/rei.jpeg"
import galo from "../assets/imgs/galinho.jpeg"

const ContainerH = styled.div`
    min-height: 75vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
`

const Titulo = styled.h1`
  margin-bottom: 20px;
`

const Texto = styled.p`
  margin-bottom: 10px;
  font-size: 22px;
`

const Rei = styled.img`
  max-width: 350px;
  min-height: 350px;
`

const Galo = styled.img`
  max-width: 350px;
  min-height: 150px;
  margin: 20px 0;
`

const Torcida = styled.img`
  max-width: 350px;
  min-height: 150px;
  margin: 20px 0;
`

const Historia = () => {
  return (
    <ContainerH>
      <Titulo>Vencer, vencer, vencer...</Titulo>
      <Texto>O Clube Atlético Mineiro foi fundando na cidade de Belo Horizonte, Minas Gerais, no dia 25 de março de 1908 por 8 estudandes e venste as cores preto e branco.</Texto>
      <Texto>Seu mascote é o Galo, um animal que simboliza a raça, característica inerente ao Clube. A torcida ecoa o canto de "Galo" em todos os jogos da equipe alvinegra.</Texto>
      <Galo src={galo} alt="mascote: Galo"/>
      <Texto>O Clube possui estádio próprio com capacidade para 50mil espectadores, uma sede administrativa no bairro de Lourdes em BH bem como o melhor centro de treinamento da América Latina.</Texto>
      <Texto>O Atlético é considerando um dos 12 grandes clubes do país e seu maior rival é o Cruzeiro também da cidade de Belo Horizonte. Dentre os principais títulos conquistados pelo clube mineiro estão: o tri Campeonato Brasileiro e a Copa Libertadores da América</Texto>
      <Rei src={rei} alt="atacante Reinaldo" />
    </ContainerH>
  )
}

export default Historia