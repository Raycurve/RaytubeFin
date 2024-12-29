import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import raytube from "../imgs/verticrop-bgrem.png"

import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';  
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '@fontsource/roboto/500.css';


const Container = styled.div `
  flex:1;
  color:${({theme}) => theme.text };
  height:100vh;
  background-color:${({theme}) => theme.bgLighter };
  font-size:10px;
  font-family:roboto;
  font-weight:500;
  position: sticky;
  top:0;
`
const Wrapper = styled.div `
padding: 10px 16px;
`
const Logo  = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  // gap:5px;
  padding: 0px 7px;
`
const Hr =styled.hr`
  margin: 8px 0px;
  border: 0.5px solid ${({theme}) => theme.soft }
`

const Item = styled.div`
  
  display:flex;
  align-items: center;
  gap: 16px;
  cursor:pointer;
  // padding-bottom:8px;
  padding:5px 3px;

  &:hover{
    background-color: ${({theme})=>theme.soft};
    border-radius:3px;
  }
`

const Img = styled.img`
  height:12vh;
`
const Login = styled.div`
  font-weight: 300;
`
const Button = styled.button`
  padding:4px 12px;
  background-color:transparent;
  border: 0.5px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 2.5px;
  font-weight: 500; 
  font-size: 10px;
  font-family:roboto;
  margin-top: 8px;
  cursor: pointer;
  display: flex;
  align-items:center;
  gap: 5px;
`

const Title = styled.h2`
  color :#aaaaaa;
  font-size: 10px;
  font-weight: 500;
  margin-bottom: 16px;

`
// console.log(${theme});
export default function Menu({darkMode,setDarkMode}) {
  
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{textDecoration:"none"}}>
          <Logo>
            <Img src={raytube} />
          </Logo>
        </Link>
        <Item>
          <HomeIcon/>
          Home  
        </Item>

        <Link to="trends" style={{textDecoration:"none" , color:"inherit"}}>
          <Item>
            <ExploreIcon/>
            Explore
          </Item>
        </Link>

        <Link to="subscriptions" style={{textDecoration:"none" , color:"inherit"}}>

          <Item>
            <SubscriptionsIcon/>
            Subscriptions 
          </Item>
        </Link>
        <Hr/>

        <Item>
          <VideoLibraryIcon/>
          Library  
        </Item>
        <Item>
          <HistoryIcon/>
          History  
        </Item>

        <Hr/>
        <Login>
          Sign in to like videos comment and subscribe
          <Link to="login" style={{textDecoration:"none"}}>
            <Button><AccountCircleIcon/> SIGN IN</Button>
          </Link>

        </Login>

        <Hr/>
        <Title>
          BEST OF RAYTUBE
        </Title>
        <Item>
          <LibraryMusicIcon/>
          Music  
        </Item>
        <Item>
          <SportsBasketballIcon/>
          Sports  
        </Item>
        <Item>
          <SportsEsportsIcon/>
          Gaming  
        </Item>
        <Item>
          <MovieCreationIcon/>
          Movies  
        </Item>
        <Item>
          <NewspaperIcon/>
          News  
        </Item>
        <Item>
          <LiveTvIcon/>
          Live  
        </Item>

        <Hr/>


        <Item>
          <SettingsIcon/>
          Settings  
        </Item>
        <Item>
          <FlagCircleIcon/>
          Report  
        </Item>
        <Item>
          <HelpOutlineIcon/>
          Hello & Support  
        </Item>
        <Item onClick={()=>{setDarkMode(!darkMode); console.log("theme changed");
        }}>
          <SettingsBrightnessIcon/>
          {(darkMode)?`Light Mode` : `Dark Mode`}
        </Item>






      </Wrapper>
    </Container>
  )
}
