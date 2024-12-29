import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import apiRequest from '../lib/apiRequest.js'
const Container = styled.div`
    padding:20px  50px;
    display:flex;
    justify-content: space-between;
    flex-wrap:wrap;
`


export default function Home({type}) {

  const  [videos,setVideos] = useState([]);

  useEffect(()=>{
    const fetchVideos = async()=>{
      const res = await apiRequest(`/videos/${type}`);
      setVideos(res.data );
      
      
      
    }
    fetchVideos();

  },[type])





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
