import React from 'react'
import styled from "styled-components"
import { NavLink } from 'react-router-dom'
import escudo from "../assets/imgs/atleticomg.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styles from "./Header.module.css"

const Head = styled.div`
    min-height: 10vh;
    min-width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.colors.bgheaderday};
    padding: 0 40px;
`

const ImgEscudoNav = styled.img`
    max-height: 80px;
    max-width: 80px;
    margin-left: -20px;
`

const Navigation = styled.nav`
    display: none;

`

const Header = () => {

    const handleClick = () => {
        const nav = document.querySelector("nav")
        if(!nav.className.includes("show")){
            nav.classList.add("show")
            nav.style.display = "flex"
        }
        else{
            nav.classList.remove("show")
            nav.style.display = "none"
        }
    }

  return (
    <Head>
        <ImgEscudoNav src={escudo} alt="Escudo do Clube Atlético Mineiro" />
        <FontAwesomeIcon onClick={handleClick} className={styles.menu} icon={faBars} />
        <Navigation>
            <NavLink>História</NavLink>
            <NavLink>Títulos</NavLink>
            <NavLink>Estrutura</NavLink>
            <NavLink>Elenco</NavLink>
        </Navigation>
    </Head>
  )
}

export default Header