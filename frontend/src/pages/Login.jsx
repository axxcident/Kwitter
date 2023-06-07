import React from 'react'
import LoginComp from '../components/LoginComp'
import styled, { createGlobalStyle } from 'styled-components'
import { useNavigate } from 'react-router'

const backgroundImage = 'url("/kwitter-logo-2.png")'

// Global styles for the body element
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #B2D6F8;
    margin: 0;
    padding: 0;
  }
`

// Styled component for the login container
const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    padding-top: 2rem;
    width: 100%;
`

const Logo = styled.nav`
    background-image: ${backgroundImage};
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 100px;
    width: 100%;
    margin-bottom: 2rem;
`

const Login = () => {
    // const navigate = useNavigate();
    // const isLoggedIn = localStorage.getItem('userId');
    // console.log(isLoggedIn)

    // React.useEffect(() => {
    //   if(isLoggedIn != null) {
    //     navigate("/")
    //   }
    // }, [isLoggedIn, navigate])

    return (
        <>
            <GlobalStyle />
            <LoginContainer>
                <Logo />
                <LoginComp />
            </LoginContainer>
        </>
    )
}

export default Login
