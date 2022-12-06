import React from 'react'
import styled from "styled-components"

const Foot = styled.div`
    min-height: 10vh;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors.bgfooterday};
`

const Footer = () => {
  return (
    <Foot>
        <p>Clube Atlético Mineiro</p>
    </Foot>
  )
}

export default Footer