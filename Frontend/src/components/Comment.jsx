import React from 'react'
import styled from 'styled-components'
import pfp from '../imgs/lion.png'


const Container = styled.div`
    display:flex;
    gap:8px;
    margin:25px 0px;

`
const Avatar = styled.img`
    width:40px;
    height:40px;
    border-radius:50%;
`
const Details = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
    color: ${({theme})=>theme.text};

`
const Name = styled.span`
    font-size:13px;
    font-weight:500;
`
const Date = styled.span`
    font-size:12px;
    font-weight:400;
    color:${({theme})=>theme.textSoft};
    margin-left:5px;
`
const Text = styled.span`
    font-size:14px;
`
export default function Comment() {
  return (
    <Container>
        <Avatar src={pfp}/>
        <Details>
            <Name>SeldomNoob<Date>4 Days ago</Date></Name>
            
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit atque neque architecto, amet aliquam illo at numquam quidem provident fugiat. Quas dolore in nam necessitatibus itaque, magnam quo cupiditate consequatur!</Text>
        </Details>
    </Container>
  )
}
