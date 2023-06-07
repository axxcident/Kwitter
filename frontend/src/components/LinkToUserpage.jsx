import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Colors, TextColor } from '../styles'

function LinkToUserPage({ strokeWidth, strokeColor, path }) {
    const [id, setId] = useState(0)
    const userPagePath = path.split('/')[1]

    useEffect(() => {
        const interval = setInterval(() => {
            const storedId = localStorage.getItem('userId')
            setId(storedId ? parseInt(storedId) : 0)
        }, 100)

        return () => {
            clearInterval(interval)
        }
    }, [])

    if (id) {
        return (
            <ButtonContainer
                strokeWidth={strokeWidth}
                strokeColor={strokeColor}
            >
                <Link to={`/userpage/${id}`}>
                    <svg
                        className={
                            userPagePath === 'userpage' ? 'active' : 'user-icon'
                        }
                        id="a"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 74.64 76.41"
                    >
                        <path
                            className="user-icon-detail"
                            d="M70.47,42.99L38.37,4.43c-.55-.66-1.56-.66-2.11,0L4.17,42.99c-.74,.89-.11,2.25,1.06,2.25h4.13v23.78c0,1.91,1.55,3.45,3.45,3.45H61.83c1.91,0,3.45-1.55,3.45-3.45v-23.78h4.13c1.16,0,1.8-1.36,1.06-2.25Zm-33.15,15.34c-6.04,0-10.94-4.9-10.94-10.94s4.9-10.94,10.94-10.94,10.94,4.9,10.94,10.94-4.9,10.94-10.94,10.94Z"
                        />
                    </svg>
                </Link>
            </ButtonContainer>
        )
    } else if (path === '/login' || path === '/signupp') {
        return ''
    } else {
        return (
            <ButtonContainer>
                <Link className="login" to="/login">
                    LOGGA IN
                </Link>
            </ButtonContainer>
        )
    }
}

export default LinkToUserPage

const ButtonContainer = styled.div`
    .login {
        font-size: 0.7rem;
        font-family: 'Poppins', sans-serif;
        color: ${TextColor.PRIMARY};
        text-decoration: none;
        font-weight: bold;
        border: 1px solid #000;
        padding: 0.5rem;
        transform: translate(0px, 0px);
        border-radius: 100px;
        --webkit-box-shadow: 0px 0px 0px 0px #000;
        --moz-boz-box-shadow: 0px 0px 0px 0px #000;
        box-shadow: 0px 0px 0px 0px #000;
        transition: transform 50ms ease-in, box-shadow 50ms ease-in;
        background-color: ${Colors.KWITTERBLUE};
    }

    /* .login:hover{
        box-shadow: 0px 3px 0px 0px #000;
        transform: translate(7px, 0px);
    } */

    .active,
    .user-icon {
        height: 30px;
    }

    .user-icon {
        fill: ${Colors.KWITTERBLUE};
    }

    .active,
    .user-icon:hover,
    .user-icon:active {
        fill: #000;
    }

    .user-icon-detail {
        stroke: none;
        stroke: ${(props) => props.strokeColor};
        stroke-width: ${(props) => props.strokeWidth};
        stroke-miterlimit: 10;
    }
`
