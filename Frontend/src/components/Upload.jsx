import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components'
import apiRequest from '../lib/apiRequest';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    background-color:#000000b5;
    display:flex;
    align-items:center;
    justify-content: center;
    
`
const Wrapper = styled.div`
    width: 480px;
    height: 480px;
    background-color: ${({theme})=>theme.bgLighter};
    color: ${({theme})=>theme.text};
    padding:16px;
    display:flex;
    flex-direction: column;
    gap:16px;
    position:relative; 
    z-index:2;

`
const Close = styled.div`
    position:absolute;
    top:8px;
    right:8px;
    cursor:pointer;
`
const Title = styled.h1`
    text-align:center;
`

const Input = styled.input`
    border: 1px solid ${({theme})=>theme.soft};
    color:${({theme})=>theme.text};
    border-radius: 3px;
    padding: 8px;
    background-color: transparent;

`

const Desc = styled.textarea`
    border: 1px solid ${({theme})=>theme.soft};
    color:${({theme})=>theme.text};
    border-radius: 3px;
    padding: 8px;
    background-color: transparent;
    resize: vertical;
    width: 95%; /* Constrain width to parent */
    max-height: 100%; /* Constrain height to parent */
`

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 8px 16px;
    font-weight: 500;
    cursor:pointer;
    background-color: ${({theme})=>theme.soft};
    color: ${({theme})=>theme.textSoft};
`

const Label = styled.label`
font-size:14px;
`

export default function Upload({setOpen}) {

    const [img,setImg] = useState("");
    const [video,setVideo] = useState("");
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [tags,setTags] = useState([]);
    

    const navigate = useNavigate();
    const handleUpload = async(e)=>{
        e.preventDefault();
        const res = await apiRequest.post("/videos",{title,desc,imgUrl:img,videoUrl:video,tags});
        setOpen(false);

        res.status ===200 && navigate(`/video/${res.data._id}`)
        console.log("upload success");
        
    }   
    return (
        <Container>
            <Wrapper>
                <Close onClick={()=>setOpen(false)}>
                    <CloseIcon/>
                </Close>
                <Title>Upload a New Video</Title>

                <Label>Video: </Label>
                <Input type='text' placeholder='Enter video URL' onChange={e=>setVideo(e.target.value)} />
                <Input type='text' placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
                <Desc  placeholder='Description' rows={8} onChange={e=>setDesc(e.target.value)}/>
                <Input type='text' placeholder='Video tags separated with commas. ' onChange={e=>setTags(e.target.value.split(","))}/>

                <Label>Thumbnail: </Label>
                <Input type='text' placeholder='Enter image URL'  onChange={e=>setImg(e.target.value)}/>
                <Button onClick={handleUpload}>Upload</Button>

            </Wrapper>
        </Container>
    )
}
