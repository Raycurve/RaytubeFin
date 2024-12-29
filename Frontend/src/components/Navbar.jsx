import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import '@fontsource/roboto/500.css';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';


const Container = styled.div`
  position: sticky;
  top:0;
  background-color: ${({theme})=>theme.bgLighter};
  height:45px;
  padding-right:40px;
`
const Wrapper = styled.div`
  display:flex;
  justify-content:flex-end;
  align-items:center;
  height:100%;
  padding 0px 20px;
  position:relative;
`

const Search = styled.div`
  //to center
  width:40%;
  position:absolute;
  left:0;
  right:0;
  margin:auto;
  align-items:center;
  // background-color:red;

  display:flex;
  justify-content:space-between;
  padding:5px;
  border:1px solid #ccc;
  border-radius:3px;

`

const Input = styled.input`
  outline:none;
  width:100%;
  color:${({theme})=>theme.text};
  font-family: roboto;
  background-color:transparent;
  border:none;

`
const Button = styled.button`
  padding:4px 12px;
  background-color:transparent;
  border: 0.5px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 2.5px;
  font-family:roboto;
  font-weight: 500; 
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items:center;
  gap: 5px;
`

const User = styled.div`
  display:flex;
  align-items:center;
  gap:10px;
  font-weight:500px;
  color: ${({theme})=>theme.text};

`
const Avatar = styled.img`
  width:25px;
  height:25px;
  border-radius:50%;
  background-color: #999;
`



export default function Navbar() {
  const currentUser = useSelector((store)=>store.user.currentUser);



  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder='Search'/> 
          <SearchIcon/>
        </Search>
        {currentUser?(
          <User>
            <VideoCallIcon/>
            <Avatar/>
            {currentUser.name}
          </User>

        ):
        <Link to="/login" style={{textDecoration:"none"}}>
          <Button><AccountCircleIcon/> SIGN IN</Button>
          </Link>
        }

      </Wrapper>
    </Container>
  )
}
