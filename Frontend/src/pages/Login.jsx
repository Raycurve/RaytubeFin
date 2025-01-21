import React, { useState } from 'react'
import styled from 'styled-components'
import apiRequest from '../lib/apiRequest'
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'
import {auth , provider} from "../firebase.js";
import { signInWithPopup } from 'firebase/auth';
import { Link } from 'react-router-dom'


const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    color:${({theme})=>theme.text};
    height:calc(100vh - 45px);
    // width:100px;
    // background-color: red;
`
const Title = styled.h1`    
    font-size:24px;

`
const SubTitle = styled.h2`
    font-size:15px;
    font-weight:300;

`
const Input = styled.input`
    border-radius: 3px;
    border:1px solid ${({theme})=>theme.soft2};
    padding:10px;
    background-color:transparent;
    width:100%;
    color: ${({theme})=>theme.text};

`
const Button = styled.button`
    padding:7px 20px;
    border-radius:3px;
    border:none;
    font-weight:500;
    cursor:pointer;
    background-color: ${({theme})=>theme.soft2};
    color: ${({theme})=>theme.textSoft};

`
const More = styled.div`
    display:flex;
    font-size:10px;
    color: ${({theme})=>theme.textSoft};

`
const Links = styled.div`
    margin-left:40px;
`

const Linke = styled.span`
    margin-left:30px;
`

const Wrapper = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
    background-color:${({theme})=>theme.bgLighter};
    border:1px solid ${({theme})=>theme.soft};
    padding: 20px 50px;
    gap:8px;
`
export default function Login() {
    const [name,setName] = useState("");
    const [nameS,setNameS] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordS,setPasswordS] = useState("");

    const currentUser = useSelector((state)=>state.user.currentUser);
    //dispatchers
    const dispatch = useDispatch();


    const handleLogin = async(e)=>{
        // e.preventDefault();
        dispatch(loginStart());
        try{
            const res = await apiRequest.post("/auth/signin/",{name :nameS,password: passwordS});
            dispatch(loginSuccess(res.data));

            console.log(res.data);

            
        }
        catch(err){
            dispatch(loginFailure()); 
        }
        
    };

    const signInWithGoogle =  () =>{
        dispatch(loginStart());
        signInWithPopup(auth,provider)
        .then((result)=>{
            console.log(result);

            apiRequest.post("auth/google",{
                name:result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL
            })
            .then((res)=>{
                dispatch(loginSuccess(res.data));
            })
        })
        .catch((error)=>{
            dispatch(loginFailure()); 
        })
    }

    const handleSignUp= async (e)=>{
        // e.preventDefault();
        try{
            const res = await apiRequest.post("/auth/signup/",{name,email,password});

            console.log(res.data);
            console.log("SIgnUp success!");
            setName(""); setEmail(""); setPassword("");
            
        }
        catch(err){
            console.log("Error while Signing Up!");
             
        }
    }

  return (
    <Container>
        <Wrapper>

            <Title>Sign in</Title>
            <SubTitle>to continue to RayTube</SubTitle>
            <Input placeholder='username' onChange={e=>setNameS(e.target.value)}/>
            <Input type='password' placeholder='password' onChange={e=>setPasswordS(e.target.value)}/>
            <Link to="/trends" style={{textDecoration:"none"}}>
                <Button onClick={handleLogin}>Sign in</Button>
            </Link>

            <Title>or</Title>
            <Button onClick={signInWithGoogle}>SignIn with Google</Button>
            <Title>or</Title>
            <Input placeholder='username' value={name} onChange={e=>setName(e.target.value)}/>
            <Input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)}/>
            <Input type='password' placeholder='password'value={password} onChange={e=>setPassword(e.target.value)}/>
            <Button onClick={handleSignUp}>Sign up</Button>
        </Wrapper>
        <More>
            English (USA)
            <Links>
                <Linke>Help</Linke>
                <Linke>Privacy</Linke>
                <Linke>Terms</Linke>
            </Links>
        </More>
    </Container>
  )
}
