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
                        className="add-icon "
                        id="a"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 75.73 75.73"
                    >
                        <path
                            className="add-icon-detail"
                            d="M37.87,3.94C19.13,3.94,3.94,19.13,3.94,37.87s15.19,33.93,33.93,33.93,33.93-15.19,33.93-33.93S56.6,3.94,37.87,3.94Zm22.24,37.43h-18.74v18.74c0,1.93-1.57,3.5-3.5,3.5s-3.5-1.57-3.5-3.5v-18.74H15.63c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5h18.74V15.63c0-1.93,1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5v18.74h18.74c1.93,0,3.5,1.57,3.5,3.5s-1.57,3.5-3.5,3.5Z"
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
        width: 30px;
    }

    .add-icon-detail {
        fill: #fff;
        stroke: #000;
        stroke-width: 3px;
    }

    .add-icon:hover .add-icon-detail,
    .add-icon:active .add-icon-detail {
        fill: #000;
        stroke: none;
    }
`

const NoPost = styled.div`
    @media (max-width: 425px) {
        width: 40px;
        height: 40px;
        background-color: transparent;
    }
`
