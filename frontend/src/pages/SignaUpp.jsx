import React from 'react';
import SignUppComp from '../components/SignUppComp';
import styled from 'styled-components';
import { Colors, TextColor } from '../styles';
import { useNavigate } from 'react-router-dom';

const SignWrap = styled.div`
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  background-color: #B2D6F8;
  position: relative;
`;

const Logo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
`;

const ArrowBTN = styled.svg`
  position: absolute;
  top: 20px;
  left: 80px;
  width: 50px;
  background-color: ${TextColor.PRIMARY};
  border-radius: 1000px;
  cursor: pointer;
  z-index: 1;
`;

const ArrowLine = styled.line`
  stroke: white;
  stroke-miterlimit: 205;
`;

const ArrowPoint = styled.polyline`
  stroke: white;
  stroke-miterlimit: 205;
  fill: none;
`;

const SignaUpp = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <>
      <SignWrap>
        <ArrowBTN onClick={handleClick} id="a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.9 35.31">
          <ArrowLine id="b" data-name="LINE" x1="28.95" y1="17.12" x2="11.12" y2="17.12" />
          <ArrowPoint id="c" data-name="POINT" points="19.96 8.11 10.95 17.12 19.96 26.13" />
        </ArrowBTN>
        <Logo>
          {/* Add your logo component here */}
          {/* Example: <img src="logo.png" alt="Logo" /> */}
        </Logo>
        <SignUppComp />
      </SignWrap>
    </>
  );
};

export default SignaUpp;




