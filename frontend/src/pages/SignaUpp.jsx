import React from 'react'
import SignUppComp from '../components/SignUppComp'
import styled, { createGlobalStyle } from 'styled-components'
import { Colors, TextColor } from '../styles'
import { useNavigate } from 'react-router-dom'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #B2D6F8;
    margin: 0;
    padding: 0;
  }
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const TopContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 80px 0 0 1rem;
    @media (max-width: 425px) {
        padding: 20px 0 0 1rem;
    }
`

const ButtonContainer = styled.div`
    width: 40px;
    background-color: #000;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SignWrap = styled.div`
    font-family: 'Poppins', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    margin: 0 auto;
`

const Logo = styled.div``

const ArrowBTN = styled.svg`
    cursor: pointer;
    height: 40px;
`

const ArrowLine = styled.line`
    stroke: white;
    stroke-miterlimit: 205;
`

const ArrowPoint = styled.polyline`
    stroke: white;
    stroke-miterlimit: 205;
    fill: none;
`

const SignaUpp = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/login')
    }

    return (
        <>
            <Wrapper>
                <TopContainer>
                    <ButtonContainer>
                        <ArrowBTN
                            onClick={handleClick}
                            id="a"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 39.9 35.31"
                        >
                            <ArrowLine
                                id="b"
                                data-name="LINE"
                                x1="28.95"
                                y1="17.12"
                                x2="11.12"
                                y2="17.12"
                            />
                            <ArrowPoint
                                id="c"
                                data-name="POINT"
                                points="19.96 8.11 10.95 17.12 19.96 26.13"
                            />
                        </ArrowBTN>
                    </ButtonContainer>
                </TopContainer>
                <GlobalStyle />
                <SignWrap>
                    <Logo>
                        {/* Add your logo component here */}
                        {/* Example: <img src="logo.png" alt="Logo" /> */}
                    </Logo>
                    <SignUppComp />
                </SignWrap>
            </Wrapper>
        </>
    )
}

export default SignaUpp
