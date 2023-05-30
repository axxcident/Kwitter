import React from 'react';
import LoginComp from '../components/LoginComp';
import styled, { createGlobalStyle } from 'styled-components';

// Global styles for the body element
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f8f8f8;
    margin: 0;
    padding: 0;
  }
`;

// Styled component for the login container
const LoginContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Login = () => {
  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <h1>Välkommen till Kwitter</h1>
        <LoginComp />
      </LoginContainer>
    </>
  );
};

export default Login;
