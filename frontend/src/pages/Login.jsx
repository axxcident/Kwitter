import React from 'react';
import LoginComp from '../components/LoginComp';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router';

const backgroundImage = 'url("/kwitter-logo-2.png")';

// Global styles for the body element
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #B2D6F8;
    margin: 0;
    padding: 0;
  }
`;

// Styled component for the login container
const LoginContainer = styled.div`
  padding: 20px;
  padding-top: 50px;
  text-align: center;
`;

const Navbar = styled.nav`
  background-image: ${backgroundImage};
  background-size: 160px 60px;
  background-position: center;
  background-repeat: no-repeat;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

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
        <Navbar />
        <LoginComp />
      </LoginContainer>
    </>
  );
};

export default Login;

