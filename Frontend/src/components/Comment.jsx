import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import pfp from '../imgs/lion.png'
import apiRequest from '../lib/apiRequest'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'


const Container = styled.div`
    display:flex;
    gap:8px;
    margin:25px 0px;


`
const Avatar = styled.img`
    width:40px;
    height:40px;
    border-radius:50%;
`
const Details = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
    color: ${({theme})=>theme.text};

`
const Name = styled.span`
    font-size:13px;
    font-weight:500;
`
const Date = styled.span`
    font-size:12px;
    font-weight:400;
    color:${({theme})=>theme.textSoft};
    margin-left:5px;
`
const Text = styled.span`
    font-size:14px;
`

const CommentWrap = styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
`
export default function Comment({comment}) {
    const [channel,setChannel] = useState({});
    const currentUser = useSelector((state)=>state.user.currentUser)||{};

    const handleDelete = async()=>{
        try{
            // console.log(comment);
            await apiRequest.delete(`/comments/${comment._id}`);
            setChannel({});
        }
        catch(err){}
    }

    useEffect(()=>{
        const fetchComment = async() =>{
            const res = await apiRequest(`/users/find/${comment.userId}`);
            setChannel(res.data);
        };
        fetchComment();
    },[comment.userId])



  return (
    <Container>
        <Avatar src={channel.img}/>
        <CommentWrap>

            <Details>
                <Name>{channel.name}<Date>{format(comment.createdAt)}</Date></Name>
                
                <Text>{comment.desc}</Text>
            </Details>
            {(currentUser._id == comment.userId) &&<Button onClick={handleDelete}>Delete</Button>}
        </CommentWrap>
    </Container>
  )
}
