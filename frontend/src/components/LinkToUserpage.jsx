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
                    <p>LOGGA IN</p>
                </Link>
            </ButtonContainer>
        )
    }
}

export default LinkToUserPage

const ButtonContainer = styled.div`
    .login {
        font-family: 'Poppins', sans-serif;
        color: ${TextColor.PRIMARY};
        text-decoration: none;
        font-weight: bold;
    }
    .user-icon {
        width: 40px;
    }

    .user-icon-detail {
        stroke: #000;
        stroke-miterlimit: 10;
    }
`
