import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme} from "./utils/darkmode";
import { useState } from "react";
import {createGlobalStyle} from 'styled-components'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Login from "./pages/Login";
import Search from "./pages/Search";

const GlobalStyle = createGlobalStyle`
  /* Hide scrollbar globally while keeping scroll functionality */
  body {
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */
    overflow: hidden; /* Prevent overflow */
    overflow-y: scroll; /* Allow scrolling without scrollbar */
  }

  body::-webkit-scrollbar {
    display: none; 
  }
`;

const Container = styled.div`

  display: flex;
`;
const Main = styled.div`
  //main 7 times the width of other flex element i.e. menu :)
  flex:7;
  background-color: ${({theme})=>theme.bg}
`;
const Wrapper = styled.div``;

function App() {
  const [darkMode,setDarkMode] = useState(true);
  
  return (
    <>
    <GlobalStyle/>
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
      
      <Container>
          <BrowserRouter>
            
          <Menu darkMode = {darkMode} setDarkMode = {setDarkMode}/>
          <Main>
            <Navbar />
            <Wrapper>

              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>}/>
                  <Route path="trends" element={<Home type="trend"/>}/>
                  <Route path="subscriptions" element={<Home type="sub"/>}/>
                  <Route path="search" element={<Search/>}/>



                  <Route path = "login" element={<Login/>}/>
                  
                  
                  <Route path = "video">
                    <Route path=":id" element={<Video/>}/>
                  </Route>
                </Route>
              </Routes>

            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
    </>
  )
}

export default App;
