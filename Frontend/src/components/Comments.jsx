import React from 'react'
import styled from 'styled-components'
import pfp from '../imgs/pfp.webp'
import Comment from './Comment'
const Container = styled.div`
    font-family:roboto;
`
const NewCom = styled.div`
    display:flex;
    align-items:center;
    gap:8px;    
`
const Avatar = styled.img`
    width:40px;
    height:40px;
    border-radius:50%;
`
const Input = styled.input`
    border:none;
    border-bottom: 1px solid ${({theme})=>theme.soft};
    background-color:transparent;
    outline:none;
    padding: 4px;
    width:100%;
    color: ${({theme})=>theme.text};
`
export default function Comments() {
  return (
    <Container>
        <NewCom>
            <Avatar src={pfp}/>
            <Input placeholder='Add a comment...'/>
        </NewCom>   

        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
    </Container>
  )
}
