import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import apiRequest from '../lib/apiRequest.js'
import { useSelector } from 'react-redux'
import { store } from '../redux/store.js'
const Container = styled.div`
    padding:20px  50px;
    display:flex;
    justify-content: space-between;
    flex-wrap:wrap;
`

export default function Home({type}) {

  const  [videos,setVideos] = useState([]);
  const currentUser = useSelector((store)=>store.user.currentUser);


  useEffect(()=>{
    const fetchVideos = async()=>{
      let res={};
      if(!currentUser && type=="sub"){
        console.log("No user Logged in");
        setVideos([]);
        return;
      }
      res = await apiRequest(`/videos/${type}`);
      
      setVideos(res.data);
      
      
      
    }
    fetchVideos();

  },[type, currentUser])





  return (


    <Container>
        {videos.map((video)=>{
            // console.log(video); 
          
          
           return(
           <Card key={video._id} video={video}/>
           )
        })}
          

        

    </Container>
  )
}
