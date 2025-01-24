import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components'


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



    
  return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>
                <CloseIcon/>
            </Close>
            <Title>Upload a New Video</Title>

            <Label>Video: </Label>
            <Input type='file' accept='video/*'/>
            <Input type='text' placeholder='Title'/>
            <Desc  placeholder='Description' rows={8}/>
            <Input type='text' placeholder='Video tags separated with commas. '/>

            <Label>Thumbnail: </Label>
            <Input type='file' accept='image/*'/>
            <Button>Upload</Button>

        </Wrapper>
    </Container>
  )
}
