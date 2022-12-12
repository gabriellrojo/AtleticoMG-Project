import React from 'react'
import styled from "styled-components"
import coroa from '../assets/imgs/coroa.png'
import libertadores from "../assets/imgs/libertadores.png"
import sula from "../assets/imgs/sula.png"
import recopa from "../assets/imgs/recopa.png"
import brasileiro from "../assets/imgs/brasileiro.png"
import copadobrasil from "../assets/imgs/copadobrasil.png"
import supercopa from "../assets/imgs/supercopa.png"
import mineiro from "../assets/imgs/mineiro.png"
import florida from "../assets/imgs/florida.png"

const ContainerT = styled.div`
    min-height: 75vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background-image: linear-gradient(to bottom right, white, #d3d2d2);
`

const Table = styled.table`
    border: 1px solid black;
`

const Titulo = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`

const Linha = styled.tr`
    text-align: center;
`

const Celula = styled.td`
    border: 1px solid black;
    min-width: 95px;
    height: 80px;

`

const Coroa = styled.img`
    max-width: 50px;
    min-height: 50px;
`

const Libertadores = styled.img`
    max-width: 20px;
    min-height: 50px;
`

const Sulamericana = styled.img`
    max-width: 20px;
    min-height: 50px;
`

const Recopa = styled.img`
    max-width: 30px;
    min-height: 40px;
`

const Brasileiro = styled.img`
    max-width: 30px;
    min-height: 40px;
`

const Copa = styled.img`
    max-width: 30px;
    min-height: 40px;
`

const Supercopa = styled.img`
    max-width: 30px;
    min-height: 40px;
`
const Mineiro = styled.img`
    max-width: 30px;
    min-height: 40px;
`

const Florida = styled.img`
    max-width: 70px;
    min-height: 40px;
`

const Titulos = () => {
  return (
    <ContainerT>
        <Titulo>Se houver uma camisa preta e branca...</Titulo>
        <Table>
            <Linha>
                <Celula></Celula>
                <Celula>Competição</Celula>
                <Celula>Título</Celula>
                <Celula>Temporada</Celula>
            </Linha>
            <Linha>
                <Celula><Coroa src={coroa} alt="Tríplice Coroa"/></Celula>
                <Celula>Tríplice Coroa</Celula>
                <Celula>1</Celula>
                <Celula>2021</Celula>
            </Linha>
            <Linha>
                <Celula><Libertadores src={libertadores} alt="Copa Libertadores"/></Celula>
                <Celula>Copa Libertadores</Celula>
                <Celula>1</Celula>
                <Celula>2013</Celula>
            </Linha>
            <Linha>
                <Celula><Sulamericana src={sula} alt="Copa Sulamericana"/></Celula>
                <Celula>Copa Sulamericana</Celula>
                <Celula>2</Celula>
                <Celula>1992, 1997</Celula>
            </Linha>
            <Linha>
                <Celula><Recopa src={recopa} alt="Recopa"/></Celula>
                <Celula>Recopa</Celula>
                <Celula>1</Celula>
                <Celula>2014</Celula>
            </Linha>
            <Linha>
                <Celula><Florida src={florida} alt="Florida Cup"/></Celula>
                <Celula>Florida Cup</Celula>
                <Celula>1</Celula>
                <Celula>2016</Celula>
            </Linha>
            <Linha>
                <Celula><Brasileiro src={brasileiro} alt="Campeonato Brasileiro"/></Celula>
                <Celula>Brasileiro</Celula>
                <Celula>3</Celula>
                <Celula>1937, 1971, 2021</Celula>
            </Linha>
            <Linha>
                <Celula><Copa src={copadobrasil} alt="Copa do Brasil"/></Celula>
                <Celula>Copa do Brasil</Celula>
                <Celula>2</Celula>
                <Celula>2014, 2021</Celula>
            </Linha>
            <Linha>
                <Celula><Supercopa src={supercopa} alt="Supercopa do Brasil"/></Celula>
                <Celula>Supercopa do Brasil</Celula>
                <Celula>1</Celula>
                <Celula>2022</Celula>
            </Linha>
            <Linha>
                <Celula><Mineiro src={mineiro} alt="Campeonato Mineiro"/></Celula>
                <Celula>Mineiro</Celula>
                <Celula>47</Celula>
                <Celula> - </Celula>
            </Linha>
        </Table>
    </ContainerT>
  )
}

export default Titulos