import React from 'react'
import { motion } from "framer-motion"
import styles from "./Home.module.css"
import styled from 'styled-components'
import seteum from "../assets/imgs/71.jpeg"
import novedois from "../assets/imgs/92.jpeg"
import treze from "../assets/imgs/2013.jpeg"
import quatorze from "../assets/imgs/2014.jpeg"
import quatorze2 from "../assets/imgs/20142.jpeg"
import doisdois from "../assets/imgs/2022.jpeg"
import dois1 from "../assets/imgs/2021.jpeg"

const Main = styled.div`
    height: 75vh;
    max-width: 100vw;
    background-image: linear-gradient(to bottom right, black, #202020);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Img = styled.img`
  max-width: 90vw;
  max-height: 50vh;
  margin-right: 20px;
  
`

const Home = () => {

  const imgs = [seteum, novedois, treze, quatorze, quatorze2, doisdois, dois1]

  return (
    <Main>
      <motion.div className={styles.container} drag="x" dragConstraints={{right: 1180, left: -1160}}>
        {imgs&& imgs.map(image => (
          <Img src={image} />
        ))}
      </motion.div>
    </Main>
  )
}

export default Home