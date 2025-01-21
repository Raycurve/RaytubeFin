import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import pfp from '../imgs/pfp.webp'
import Comment from './Comment'
import apiRequest from '../lib/apiRequest'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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

const Button = styled.button`
    width: 50px;
    background-color: #4a3d3a;
    border-radius:5px;
    color:${({theme})=>theme.text};
`
export default function Comments({videoId}) {
    const currentUser = useSelector((state)=>state.user.currentUser)||{};

    const [comments,setComments] = useState([]);
    
    const [desc,setDesc] = useState("");
    
    
    const addComment = async(e)=>{
        e.preventDefault();
        try{
            if (!desc.trim()) return; // Prevent empty comments
            const res = await apiRequest.post("/comments/",{desc,videoId});
            setComments([res.data, ...comments]);
            // console.log(res.data);
            setDesc("");
        }
        catch(err){
        }
        
    };
    
    const handleDeleteComment = (commentId) => {
        setComments((prevComments) => prevComments.filter((c) => c._id !== commentId));
    };

    useEffect(()=>{
        const fetchComments = async()=>{
            try{
                const res = await apiRequest(`/comments/${videoId}`);
                setComments(res.data);
            }
            catch(err){}
        };
        fetchComments();
    },[videoId])
    


  return (
    <Container>
        <NewCom>
            <Avatar src={currentUser.img}/>
            <Input  placeholder="Add a comment..." value={desc}  onChange={e=>setDesc(e.target.value)}/>
            {
                (currentUser._id)?
                (
                <Button onClick={addComment}> + </Button>):(

                <Link to="/login" style={{textDecoration:"none"}}>
                    <Button  style={{width:"60px"}}> Sign In </Button>
                </Link>
                )

            }
        </NewCom>   
        {comments.map((comment)=>{
            return <Comment key = {comment._id} comment={comment} onDelete={()=>handleDeleteComment(comment._id)}/>
        })}
        {/* <Comment/> */}
       
    </Container>
  )
}
