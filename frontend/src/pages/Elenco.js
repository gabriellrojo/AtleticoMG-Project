import React from 'react'
import styled from "styled-components"
import brasil from "../assets/imgs/brazil.png"
import argentina from "../assets/imgs/argentina.png"

const ContainerE = styled.div`
    min-height: 75vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background-image: linear-gradient(to bottom right, white, #d3d2d2);
`

const Titulo = styled.h1`
    margin-bottom: 20px;
    text-align: center;
`

const Table = styled.table`
    border: 1px solid black;
`

const Linha = styled.tr`
    text-align: center;
`

const Celula = styled.td`
    border: 1px solid black;
    min-width: 95px;
    height: 80px;
`

const Flag = styled.img`
    max-width: 80px;
    min-height: 50px;
`


const Elenco = () => {
  return (
    <ContainerE>
        <Titulo>O nosso time é imortal!</Titulo>
        <Table>
            <Linha>
                <Celula>Nacionalidade</Celula>
                <Celula>Nome</Celula>
                <Celula>Nascimento</Celula>
                <Celula>Posição</Celula>
            </Linha>
            <Linha>
                <Celula><Flag src={brasil} alt="Brasil"/></Celula>
                <Celula>Everson</Celula>
                <Celula>22/07/90</Celula>
                <Celula>Goleiro</Celula>
            </Linha>
            <Linha>
                <Celula><Flag src={brasil} alt="Brasil"/></Celula>
                <Celula>Gilberto</Celula>
                <Celula>07/03/93</Celula>
                <Celula>Lateral Direito</Celula>
            </Linha>
            <Linha>
                <Celula><Flag src={brasil} alt="Brasil"/></Celula>
                <Celula>Bruno Fuchs</Celula>
                <Celula>01/04/99</Celula>
                <Celula>Zagueiro</Celula>
            </Linha>
            <Linha>
                <Celula><Flag src={brasil} alt="Brasil"/></Celula>
                <Celula>Jemerson</Celula>
                <Celula>24/08/92</Celula>
                <Celula>Zagueiro</Celula>
            </Linha>
            <Linha>
                <Celula><Flag src={brasil} alt="Brasil"/></Celula>
                <Celula>Arana</Celula>
                <Celula>14/04/97</Celula>
                <Celula>Lateral Esquerdo</Celula>
            </Linha>
            <Linha>
                <Celula><Flag src={brasil} alt="Brasil"/></Celula>
                <Celula>Allan</Celula>
                <Celula>03/03/97</Celula>
                <Celula>Volante</Celula>
            </Linha>
            <Linha>
                <Celula><Flag src={argentina} alt="Argentina"/></Celula>
                <Celula>Zaracho</Celula>
                <Celula>10/02/98</Celula>
                <Celula>Volante</Celula>
            </Linha>
            <Linha>
                <Celula><Flag src={brasil} alt="Brasil"/></Celula>
                <Celula>Edenilson</Celula>
                <Celula>18/12/89</Celula>
                <Celula>Meia</Celula>
            </Linha>
            <Linha>
                <Celula><Flag src={argentina} alt="Argentina"/></Celula>
                <Celula>Nacho Fernandez</Celula>
                <Celula>12/01/90</Celula>
                <Celula>Meia</Celula>
            </Linha>
            <Linha>
                <Celula><Flag src={brasil} alt="Brasil"/></Celula>
                <Celula>Paulinho</Celula>
                <Celula>15/07/00</Celula>
                <Celula>Atacante</Celula>
            </Linha>
            <Linha>
                <Celula><Flag src={brasil} alt="Brasil"/></Celula>
                <Celula>Hulk</Celula>
                <Celula>25/07/87</Celula>
                <Celula>Atacante</Celula>
            </Linha>
            <Linha>
                <Celula><Flag src={argentina} alt="Argentina"/></Celula>
                <Celula>Coudet</Celula>
                <Celula>12/09/74</Celula>
                <Celula>Técnico</Celula>
            </Linha>
        </Table>
    </ContainerE>
  )
}

export default Elenco