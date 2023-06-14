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
                            d="M7.32,14.81v50.47c0,2.63,2.13,4.77,4.77,4.77h3.91s0-7.41,0-7.41c0-9.66,6.43-17.81,15.24-20.43-6.06-3.31-9.14-11.41-4.13-19.21,.56-.87,1.31-1.62,2.18-2.18,10.13-6.5,20.76,.62,20.76,10.22,0,4.82-2.68,9.01-6.64,11.17,8.81,2.62,15.24,10.77,15.24,20.43v7.41h3.91c2.63,0,4.77-2.13,4.77-4.77V14.81c0-2.63-2.13-4.77-4.77-4.77H12.08c-2.63,0-4.77,2.13-4.77,4.77Z"
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
