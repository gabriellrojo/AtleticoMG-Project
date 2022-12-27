import React, { useEffect } from 'react'
import styled from "styled-components"
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from "./Comment.module.css"
import api from '../api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from "@fortawesome/free-solid-svg-icons"
import { far } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas)
library.add(far)

const Container = styled.div`
  min-height: 75vh;
  max-width: 100vw;
  background-image: linear-gradient(to bottom right, black, #202020);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: whitesmoke;
  padding: 40px;  
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  margin-bottom: -40px;
  margin-top: -20px;

`

const LikesContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  margin-top: 10px;
`

const CommentT = styled.p`
    font-weight: bold;
    font-size: 30px;

`

const Autor = styled.span`
    font-style: italic;
`

const ContainerC = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -20px;
  min-width: 330px;
`

const ContainerC2 = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid whitesmoke;
`

const Autor2 = styled.p`
    margin-bottom: -5px;
    font-style: italic;
`
const Respostas = styled.p`
  font-size: 25px;
  margin-top: 50px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  font-weight: bold;
  margin-top: 30px;
`

const Input = styled.input`
  margin-bottom: 30px;
  background-color: black;
  border: none;
  border-bottom: 1px solid #d3d2d2;
  padding: 15px 0;
  padding-left: 7px;
  padding-right: 80px;
  margin-top: 20px;
  color: whitesmoke;
  font-size: 20px;
  outline-color: ${props => props.theme.colors.bgfooterday};
`

const Btn = styled.input`
  background-color: ${props => props.theme.colors.bgfooterday};
  padding: 18px 0;
  border-radius: 10px;
  margin: 20px 0;
  font-size: 20px;
`

const Comment = () => {
    const token = localStorage.getItem("token")
    const paramsId = useParams()
    const id = useParams().id
    const [comment, setComment] = useState()
    const [reply, setReply] = useState()

    useEffect(() => {
        
        api.get(`http://localhost:5000/post/comment/${id}`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(res => {
            setComment(res.data.comment)
            console.log(res.data.comment)
        }).catch(err => console.log(err.response.data.erro))

    }, [comment])

    const handleLike = async (id) => {
        await api.put(`http://localhost:5000/likeoncomment/${id}`, null, {
          headers: {
            "authorization": `Bearer ${token}`
          }
        }).then()
          .catch(err => console.log(err.response.data.erro))
        
    }
    
    const handleNoLike = async (id) => {
        await api.put(`http://localhost:5000/unlikecomment/${id}`, null, {
          headers: {
            "authorization": `Bearer ${token}`
          }
        }).then()
          .catch(err => console.log(err.response.data.erro))
    }
    
    const handleDislike = async (id) => {
        await api.put(`http://localhost:5000/dislikeoncomment/${id}`, null, {
          headers: {
            "authorization": `Bearer ${token}`
          }
        }).then()
          .catch(err => console.log(err.response.data.erro))
    }
    
    const handleNoDislike = async (id) => {
        await api.put(`http://localhost:5000/undislikecomment/${id}`, null, {
          headers: {
            "authorization": `Bearer ${token}`
          }
        }).then()
          .catch(err => console.log(err.respose.data.erro))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const rep = {
            reply: reply
        }
        
        await api.post(`http://localhost:5000/post/comment/reply/${id}`, rep, {
            headers: {
                "Content-type": "application/json",
                "authorization" : `Bearer ${token}`
            }
        }).then(res => console.log(res.data.updateComment))
          .catch(err => console.log(err.response.data.erro))
    }
  
  return (
    <Container>
        {comment&& 
        <div>
            <CommentT>{comment.comment}</CommentT>
            <p>autor: <Autor>{comment.name}</Autor></p>
            <LikesContainer>
                {comment.likes.includes(comment.userId) ? 
                (<IconContainer>
                    <FontAwesomeIcon onClick={() => handleNoLike(comment._id)} className={styles.icone} icon="fa-solid fa-thumbs-up"/> <p>{comment.likes.length} likes</p>
                </IconContainer>) : 
                (<IconContainer>
                    <FontAwesomeIcon onClick={() => handleLike(comment._id)} className={styles.icone} icon="fa-regular fa-thumbs-up"/> <p>{comment.likes.length} likes</p>
                </IconContainer>)}
                {comment.dislikes.includes(comment.userId) ?
                (<IconContainer>
                    <FontAwesomeIcon onClick={() => handleNoDislike(comment._id)} className={styles.icone} icon="fa-solid fa-thumbs-down"/> <p>{comment.dislikes.length} dislikes</p>
                </IconContainer>) : 
                (<IconContainer>
                    <FontAwesomeIcon onClick={() => handleDislike(comment._id)} className={styles.icone} icon="fa-regular fa-thumbs-down"/> <p>{comment.dislikes.length} dislikes</p>
                </IconContainer>)}
            </LikesContainer>
            <Respostas>Respostas:</Respostas>
            <ContainerC>
                {comment.replies.length > 0 ? 
                    (comment.replies.map(reply => (
                        <ContainerC2>
                            <Autor2>{reply.name}:</Autor2>
                            <p>{reply.reply}</p>
                        </ContainerC2>
                    ))) : 
                    (<p>Não há nenhuma resposta para esse comentário</p>)}
            </ContainerC>
        </div>}
        <Form onSubmit={handleSubmit}>
            <Label>
                Responder: 
                <Input type="text" placeholder="Digite sua resposta" value={reply} onChange={(e) => setReply(e.target.value)}/>
            </Label>
            <Btn type="submit" value="Responder"/>
        </Form>
        {comment && <Link to={`/post/${comment.postId}`} className={styles.back}>Voltar</Link>}
    </Container>
  )
}

export default Comment