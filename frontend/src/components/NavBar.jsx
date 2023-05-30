import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TextColor } from '../styles'
import styled from 'styled-components'

function NavBar() {
    const [id, setId] = useState(0)
    useEffect(() => {
        setId(localStorage.getItem('userId'))
    }, [id])

    const url = `/userpage/${id}`

    if (id) {
        return (
            <Container>
                <ButtonContainer>
                    <Link to={url}>
                        <svg
                            className="user-icon"
                            id="a"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 22.14 27.85"
                        >
                            <circle
                                className="user-icon-detail"
                                cx="11.07"
                                cy="6.81"
                                r="6.31"
                            />
                            <path
                                className="user-icon-detail"
                                d="M11.07,13.11h0c5.83,0,10.57,4.74,10.57,10.57v3.67H.5v-3.67c0-5.83,4.74-10.57,10.57-10.57Z"
                            />
                        </svg>
                    </Link>
                    <Link to="/">
                        <svg
                            className="flow-icon"
                            id="a"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 42.5 26.04"
                        >
                            <path d="M5.46,16.8l1.42-1.38c.72-.7,1.38-1.47,1.99-2.29h-3.4s0,.02,0,.03v3.64Z" />
                            <path d="M39.55,10.22h-1.85c-.37,1.66-1.85,2.91-3.62,2.91H14.48c-2.38,1.88-5.18,3.18-8.12,3.78l-.9,.18v2.55c0,1.62,1.32,2.94,2.94,2.94H28.28l.1,.08c1.95,1.56,4.19,2.71,6.56,3.38-.87-.87-1.67-1.83-2.37-2.87l-.41-.6h7.38c1.62,0,2.94-1.32,2.94-2.94v-6.47c0-1.62-1.32-2.94-2.94-2.94Z" />
                            <path d="M2.94,12.36h7.38l-.41,.6c-.71,1.04-1.5,2-2.37,2.87,2.37-.67,4.61-1.83,6.56-3.38l.1-.08h19.88c1.62,0,2.94-1.32,2.94-2.94V2.94c0-1.62-1.32-2.94-2.94-2.94H2.94C1.32,0,0,1.32,0,2.94v6.48c0,1.62,1.32,2.94,2.94,2.94Z" />
                        </svg>
                    </Link>

                    <svg
                        className="add-icon"
                        id="a"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 25.47 25.47"
                    >
                        <polyline
                            id="b"
                            data-name="POINT"
                            className="add-icon-detail"
                            points="25.47 12.73 12.73 12.73 12.73 25.47"
                        />
                        <polyline
                            id="c"
                            data-name="POINT"
                            className="add-icon-detail"
                            points="0 12.74 12.74 12.74 12.74 0"
                        />
                    </svg>
                </ButtonContainer>
            </Container>
        )
    } else {
        return (
            <Container>
                <ButtonContainer>
                    <Link className="login" to="/login">
                        <p>LOGGA IN</p>
                    </Link>
                    <Link to="/">
                        <svg
                            className="flow-icon"
                            id="a"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 42.5 26.04"
                        >
                            <path d="M5.46,16.8l1.42-1.38c.72-.7,1.38-1.47,1.99-2.29h-3.4s0,.02,0,.03v3.64Z" />
                            <path d="M39.55,10.22h-1.85c-.37,1.66-1.85,2.91-3.62,2.91H14.48c-2.38,1.88-5.18,3.18-8.12,3.78l-.9,.18v2.55c0,1.62,1.32,2.94,2.94,2.94H28.28l.1,.08c1.95,1.56,4.19,2.71,6.56,3.38-.87-.87-1.67-1.83-2.37-2.87l-.41-.6h7.38c1.62,0,2.94-1.32,2.94-2.94v-6.47c0-1.62-1.32-2.94-2.94-2.94Z" />
                            <path d="M2.94,12.36h7.38l-.41,.6c-.71,1.04-1.5,2-2.37,2.87,2.37-.67,4.61-1.83,6.56-3.38l.1-.08h19.88c1.62,0,2.94-1.32,2.94-2.94V2.94c0-1.62-1.32-2.94-2.94-2.94H2.94C1.32,0,0,1.32,0,2.94v6.48c0,1.62,1.32,2.94,2.94,2.94Z" />
                        </svg>
                    </Link>

                    <svg
                        className="add-icon"
                        id="a"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 25.47 25.47"
                    >
                        <polyline
                            id="b"
                            data-name="POINT"
                            className="add-icon-detail"
                            points="25.47 12.73 12.73 12.73 12.73 25.47"
                        />
                        <polyline
                            id="c"
                            data-name="POINT"
                            className="add-icon-detail"
                            points="0 12.74 12.74 12.74 12.74 0"
                        />
                    </svg>
                </ButtonContainer>
            </Container>
        )
    }
}

export default NavBar

const Container = styled.div`
    min-height: 60px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px solid #000;

    .login {
        font-family: 'Poppins', sans-serif;
        color: ${TextColor.PRIMARY};
        text-decoration: none;
        font-weight: bold;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    .user-icon,
    .flow-icon,
    .add-icon {
        width: 50px;
    }

    .user-icon-detail {
        stroke: #000;
        stroke-miterlimit: 10;
    }

    .add-icon-detail {
        fill: none;
        stroke: #000;
        stroke-miterlimit: 10;
    }
`
