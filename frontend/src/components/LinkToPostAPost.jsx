import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Colors } from '../styles'

function LinkToPostAPost({ strokeWidth, strokeColor, path }) {
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
            <ButtonContainer
                strokeWidth={strokeWidth}
                strokeColor={strokeColor}
            >
                <Link to="/post-a-post">
                    <svg
                        className={
                            path === '/post-a-post' ? 'active' : 'add-icon'
                        }
                        id="a"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 75.73 75.73"
                    >
                        <path
                            className="add-icon-detail"
                            d="M7.87,12.87V62.86c0,2.76,2.24,5,5,5H62.86c2.76,0,5-2.24,5-5V12.87c0-2.76-2.24-5-5-5H12.87c-2.76,0-5,2.24-5,5Zm51.62,28.4h-18.22v18.22c0,1.88-1.52,3.4-3.4,3.4s-3.4-1.52-3.4-3.4v-18.22H16.25c-1.88,0-3.4-1.52-3.4-3.4s1.52-3.4,3.4-3.4h18.22V16.25c0-1.88,1.52-3.4,3.4-3.4s3.4,1.52,3.4,3.4v18.22h18.22c1.88,0,3.4,1.52,3.4,3.4s-1.52,3.4-3.4,3.4Z"
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
    .active,
    .add-icon {
        width: 30px;
    }

    .add-icon-detail {
        fill: ${Colors.KWITTERBLUE};
        stroke: none;
        stroke: ${(props) => props.strokeColor};
        stroke-width: ${(props) => props.strokeWidth};
    }

    .add-icon:hover .add-icon-detail,
    .add-icon:active .add-icon-detail,
    .active .add-icon-detail {
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
