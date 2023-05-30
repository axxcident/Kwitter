import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TextColor } from '../styles'

function LinkToUserPage() {
    const [id, setId] = useState(0)
    useEffect(() => {
        setId(localStorage.getItem('userId'))
    }, [id])

    const url = `/userpage/${id}`

    if (id) {
        return (
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
            </ButtonContainer>
        )
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
        font-size: .7rem;
        font-family: 'Poppins', sans-serif;
        color: ${TextColor.PRIMARY};
        text-decoration: none;
        font-weight: bold;
        border: 1px solid #000;
        padding: .5rem;
        transform: translate(0px, 0px);
        border-radius: 100px;
        --webkit-box-shadow: 0px 0px 0px 0px #000;
        --moz-boz-box-shadow: 0px 0px 0px 0px #000;
        box-shadow: 0px 0px 0px 0px #000;
        transition:
        transform 50ms ease-in,
        box-shadow 50ms ease-in
        ;

    }

    /* .login:hover{
        box-shadow: 0px 3px 0px 0px #000;
        transform: translate(7px, 0px);
    } */

    .user-icon {
        height: 40px;
        fill: none;
    }

    .user-icon-detail {
        stroke: #000;
        stroke-miterlimit: 10;
    }
`
