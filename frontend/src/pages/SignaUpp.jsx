import React from 'react'
import SignUppComp from '../components/SignUppComp'
import styled from "styled-components";
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
  .arrowBTN {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 50px;
    background-color: ${TextColor.PRIMARY};
    border-radius: 1000px;
    cursor: pointer;
  }
  .arrowLine {
    stroke: white;
    stroke-miterlimit: 205;
  }
  .arrowPoint {
    stroke: white;
    stroke-miterlimit: 205;
    fill: none;
  }
`

const SignaUpp = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <>
      <SignWrap>
      <svg onClick={handleClick} className='arrowBTN' id="a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.9 35.31">
        <line className='arrowLine' id="b" data-name="LINE" x1="28.95" y1="17.12" x2="11.12" y2="17.12"/>
        <polyline className='arrowPoint' id="c" data-name="POINT" points="19.96 8.11 10.95 17.12 19.96 26.13"/>
      </svg>
        <SignUppComp />
      </SignWrap>
    </>
  )
}

export default SignaUpp
