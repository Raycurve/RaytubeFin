import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import apiRequest from '../lib/apiRequest';
import Card from '../components/Card';


const Container = styled.div`
    padding:20px  50px;
    display:flex;
    // justify-content: space-between;
    gap:8px;
    flex-wrap:wrap;
`
export default function Search() {
    const [vids,setVids] = useState([]);
    const query = useLocation().search

    useEffect(()=>{
        const fetchVids = async()=>{
            const res = await apiRequest(`/videos/search/${query}`);
           
            
            
            setVids(res.data);  
        };
        fetchVids();

    },[query])


    return (
        <Container>
            {
                vids.map((video=>(
                    <Card key={video._id} video = {video}/>
                )))
            }
        </Container>
    )
}
