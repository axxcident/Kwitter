import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function LinkToPostAPost() {
    const [id, setId] = useState(0)

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
            <ButtonContainer>
                <Link to="/post-a-post">
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
                </Link>
            </ButtonContainer>
        )
    } else {
        return (
            <ButtonContainer>
                <NoPost />
            </ButtonContainer>
        )
    }
}

export default LinkToPostAPost

const ButtonContainer = styled.div`
    .add-icon {
        padding: .2rem;
        border: 1px solid #000;
        border-radius: 100px;
        width: 40px;
    }
    .add-icon-detail {
        fill: none;
        stroke: #000;
        stroke-width: 1px;
        /* stroke-miterlimit: 100; */
    }
`

const NoPost = styled.div`
    @media (max-width: 425px) {
        width: 40px;
        height: 40px;
        background-color: transparent;
    }
`
