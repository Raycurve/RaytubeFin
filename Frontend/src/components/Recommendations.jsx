import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import apiRequest from '../lib/apiRequest';
import Card from './Card';


const Container = styled.div`
    flex:2;
`
export default function Recommendations({tags}) {

    const [videos, setVideos] = useState([]);
    useEffect(()=>{
        const fetchVids = async ()=>{
            const res = await apiRequest.get(`/videos/tags?tags=${tags}`);
            // console.log(`/videos/tags?tags=${tags}`);
            // console.log(res);
            
            setVideos(res.data);
        }
        fetchVids();

        
    },[tags])
    return (
        <Container>
            {videos.map((video)=>{
                return(
                <Card type ="sm" key={video._id} video = {video} />
                )
            })}
        </Container>
    )
}


