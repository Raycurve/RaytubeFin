import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ThumbUpIconOutline from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffOutline from '@mui/icons-material/ThumbDownOffAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import BookmarkIcon from '@mui/icons-material/BookmarkBorder';
import pfp from '../imgs/pfp.webp';
import Comments from '../components/Comments';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import apiRequest from '../lib/apiRequest';
import { dislike, fetchFailure, fetchStart, fetchSuccess, like } from '../redux/videoSlice';
import { format } from 'timeago.js';
import { subscription } from '../redux/userSlice';



const Container = styled.div`
    padding:20px  50px;
    display:flex;
    gap:20px;
    font-size:14px;
    font-family:roboto;
`
const Content = styled.div`
  flex:5;
  // background-color:red;
`

const VideoWrapper = styled.div`
`

const Title = styled.h1`
  font-size:14px;
  font-weight:400;
  margin-top:15px;
  margin-bottom:8px;
  color: ${({theme})=>theme.text};

`
const Details = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
`
const Info = styled.span`
  color: ${({theme})=>theme.textSoft};
`
const Buttons = styled.div`
  display:flex;

  gap:18px;
  align-items:center;
`
const Button = styled.div`
  color:${({theme})=>theme.text};
  display:flex;
  align-items:center;
  gap:4px;
  cursor:pointer;
`
const Hr = styled.hr`
  margin:15px 0px;
  border: 0.5px solid ${({theme})=>theme.soft};
`
const Recom = styled.div`
  flex: 2;
  // background-color:grey;
`

const Channel = styled.div`
  display:flex;
  justify-content:space-between;
  `
const ChannelInfo = styled.div`
  display:flex;
  gap:20px;
`

const Img = styled.img`
  width:40px;
  height:40px;
  border-radius:50%;
`
const ChannelName = styled.span`
  font-size: 16px;
  font-weight:500;

`
const ChannelCounter = styled.span`
  margin-top:4px;
  margin-bottom:14px;
  color : ${({theme})=>theme.textSoft};
  font-size:13px;
`
const ChannelDetails = styled.div`
display:flex;
flex-direction:column;
color:${({theme})=>theme.text}; 
`
const Description = styled.p`
  font-size:14px;
`

const SubsButt = styled.button`
  background-color:#cc1a00;
  color:white;
  border:none;
  border-radius:3px;
  height:max-content;
  padding:8px 16px;
  cursor:pointer;
`
export default function Video() {

  const currentUser = useSelector((state)=>state.user.currentUser)||{};
  const currentVideo = useSelector((state)=>state.video.currentVideo)||{};
  const dispatch =useDispatch();
  
  const path = useLocation().pathname.split("/")[2];
  console.log(path);
  // console.log(currentVideo);
  
  // const [video,setVideo] = useState({});
  const [channel,setChannel] = useState({});

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        dispatch(fetchStart());
        const videoRes = await apiRequest(`/videos/find/${path}`);
        const channelRes = await apiRequest(`/users/find/${videoRes.data.userId}`);

        setChannel(channelRes.data);
        // setVideo(videoRes.data);
        dispatch(fetchSuccess(videoRes.data));
        // console.log(currentVideo);
        
        
      }
      catch(err){ dispatch(fetchFailure())}
    }
    fetchData();

  },[path,dispatch])


  const handleLike = async()=>{
    await apiRequest.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  }
  const handleDislike = async()=>{
    await apiRequest.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));

  }
  const handleSub = async()=>{
    currentUser.subscriberChannels?.includes(currentVideo.userId)
    ?
    await apiRequest.put(`/users/unsub/${currentVideo.userId}`)
    :
    await apiRequest.put(`/users/sub/${currentVideo.userId}`)

    dispatch(subscription(currentVideo.userId));
  }

  return (
    <Container>
      <Content>
        <VideoWrapper><iframe width="880" height="495" src="https://www.youtube.com/embed/Vitf8YaVXhc" title="I never understood why you can&#39;t go faster than light - until now!" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.views} views • {format(currentVideo.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser._id)?<ThumbUpIcon/>:<ThumbUpIconOutline/>}
              {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser._id)?<ThumbDownIcon/>:<ThumbDownOffOutline/>}
              Dislike
            </Button>
            <Button>
              <ReplyIcon/>
              Share
            </Button>
            <Button>
              <BookmarkIcon/>
              Save
            </Button>
          </Buttons>
        </Details>
        <Hr/>

        {/*channel details*/}
        <Channel>  
          <ChannelInfo>
            <Img src = {channel.img}/>
            <ChannelDetails>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo.desc}</Description>
            </ChannelDetails>
          </ChannelInfo>
          <SubsButt onClick={handleSub}>{currentUser.subscriberChannels?.includes(currentVideo.userId)?"SUBSCRIBED":"SUBSCRIBE"}</SubsButt>
        </Channel>
        <Hr/>
        {/*comments*/}
        <Comments>
          comments
        </Comments>
      </Content>

      {/* <Recom>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
      </Recom> */}
    </Container>
  )
}
