import React from 'react'
import SignUppComp from '../components/SignUppComp'
import styled from "styled-components";

const SignWrap = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  background-color: #B2D6F8;
`

const SignaUpp = () => {
  return (
    <>
      <SignWrap>
        <button>Gå tillbaka</button>
        <SignUppComp />
      </SignWrap>
    </>
  )
}

export default SignaUpp
