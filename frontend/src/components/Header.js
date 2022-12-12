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
    flex-direction: column;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    min-width: 65vw;
    padding: 0 20px;
    padding-top: 10px;
    min-height: 100vh;
    border: 1px solid black;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: #e0e0e0;
    opacity: 0.9;

`

const Header = () => {

    const handleClick = () => {
        const nav = document.querySelector("nav")
        const menu = document.querySelector("svg")
        if(!nav.className.includes("show")){
            nav.classList.add("show")
            nav.style.display = "flex"
            menu.style.display = "none"
        }
        else{
            nav.classList.remove("show")
            nav.style.display = "none"
            menu.style.display = "flex"
            
        }
    }

  return (
    <Head>
        <ImgEscudoNav src={escudo} alt="Escudo do Clube Atlético Mineiro" />
        <FontAwesomeIcon onClick={handleClick} className={styles.menu} icon={faBars} />
        <Navigation onClick={handleClick}>
            <NavLink className={styles.links} to="/">Home</NavLink>
            <NavLink className={styles.links} to="/historia">História</NavLink>
            <NavLink className={styles.links} to="/titulos">Títulos</NavLink>
            <NavLink className={styles.links} to="/estrutura">Estrutura</NavLink>
            <NavLink className={styles.links} to="/elenco">Elenco</NavLink>
            <NavLink className={styles.links} to="/login">Login</NavLink>
        </Navigation>
    </Head>
  )
}

export default Header