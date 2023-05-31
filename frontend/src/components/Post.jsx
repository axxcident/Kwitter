import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Colors, TextColor, Shadows } from '../styles'
import { useNavigate } from 'react-router-dom'

function Post(props) {
    const [dateCreated, setDateCreated] = useState(null)
    const [user, setUser] = useState([])
    const [canEdit, setCanEdit] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const navigate = useNavigate()

    // Hämta all data om en user
    useEffect(() => {
        axios
            .get(`http://localhost:8800/users/${props.user_id}`)
            .then((response) => {
                setUser(response.data)
                setDateCreated(new Date(props.created))
                // setCanEdit(false)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [props.user_id, props.created])

    // kolla ifall user är inloggad
    useEffect(() => {
        const loggedInUserId = localStorage.getItem('userId')
        const isOwner =
            loggedInUserId && Number(props.user_id) === Number(loggedInUserId)
        setCanEdit(isOwner)
        console.log(isOwner)
    }, [props.user_id])

    // Radera ett inlägg
    function handleDelete(post_id) {
        axios
            .delete(`http://localhost:8800/posts/${post_id}/delete`)
            .then((response) => {
                console.log(response.data)
                console.log(`http://localhost:8800/posts/${post_id}/delete`)
                window.location.reload()
            })
            .catch((error) => {
                console.error(error)
            })
    }
    function handleEdit() {
        setIsEditing(!isEditing)
    }

    // Tidsfunktionen
    function formatTimeDifference() {
        if (!dateCreated) return ''
        const currentDate = new Date()
        const timeDifference = currentDate - dateCreated
        if (timeDifference < 60000) {
            const seconds = Math.floor(timeDifference / 1000)
            return `${seconds} sek sedan`
        } else if (timeDifference < 3600000) {
            const minutes = Math.floor(timeDifference / 60000)
            return `${minutes} min sedan`
        } else if (timeDifference < 86400000) {
            const hours = Math.floor(timeDifference / 3600000)
            return `${hours} h sedan`
        } else {
            const days = Math.floor(timeDifference / 86400000)
            return `${days} dagar sedan`
        }
    }

    // Likea ett inlägg
    const handleLike = async () => {
        const loggedInUserId = localStorage.getItem('userId')
        if (!loggedInUserId) {
            console.log(loggedInUserId)
            alert('Du måste vara inloggad för att kunna gilla ett inlägg')
            return
        }
        try {
            const postId = props.post_id
            const requestBody = {
                poster_id: loggedInUserId
            }
            await axios.post(
                `http://localhost:8800/posts/${postId}/like`,
                requestBody
            )
            console.log(
                'Du som användare ',
                loggedInUserId,
                ' har gillat inlägg nr: ',
                postId
            )
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    // Un-Likea ett inlägg
    const handleDisLike = async () => {
        const loggedInUserId = localStorage.getItem('userId')
        if (!loggedInUserId) {
            console.log(loggedInUserId)
            alert('Du måste vara inloggad för att kunna ogilla ett inlägg')
            return
        }
        try {
            const postId = props.post_id
            const requestBody = {
                poster_id: loggedInUserId
            }
            await axios.post(
                `http://localhost:8800/posts/${postId}/dislike`,
                requestBody
            )
            console.log(
                'Du som användare ',
                loggedInUserId,
                ' har ogillat inlägg nr: ',
                postId
            )
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    // Klicka på en användare och komm till userpage
    const goToUserPage = (id) => {
        navigate(`/userpage/${id}`)
    }

    // Klicka på inlägg och komma till inlägg sida

    return (
        <Container>
            <TopContainer onClick={() => goToUserPage(user.id)}>
                {user.firstname} {user.lastname} {formatTimeDifference()}{' '}
                {canEdit && (
                    <div>
                        {!isEditing && (
                            <button onClick={handleEdit}>Redigera</button>
                        )}
                        {isEditing && (
                            <>
                                <button onClick={handleEdit}>Avbryt</button>
                                <button
                                    onClick={() => handleDelete(props.post_id)}
                                >
                                    Ta bort
                                </button>
                            </>
                        )}
                    </div>
                )}
            </TopContainer>
            <EmailContainer>{user.email}</EmailContainer>
            <PostContainer>{props.post}</PostContainer>
            <ButtonsWrapper>
                {props.hasLike ? (
                    <ButtonsContainer>
                        <svg
                            onClick={handleDisLike}
                            className="like-btn"
                            id="a"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 34.25 35.31"
                        >
                            <g id="b" data-name="Like">
                                <path
                                    className="like-fill"
                                    fill="#FF0000"
                                    d="M25.8,8.19c-1.45-.89-3.04-1.16-4.72-.86-1.14,.21-2.17,.69-3.06,1.43-.32,.27-.61,.57-.92,.87,0,0-.02-.02-.03-.03-.71-.84-1.58-1.47-2.59-1.88-1.13-.46-2.32-.6-3.53-.43-1.15,.17-2.18,.6-3.1,1.31-1.32,1.02-2.16,2.34-2.52,3.98-.21,.95-.17,1.91-.03,2.87,.21,1.47,.77,2.8,1.57,4.04,1,1.54,2.29,2.79,3.71,3.94,1.24,1,2.56,1.87,3.87,2.77,.76,.52,1.51,1.06,2.26,1.6,.14,.1,.27,.22,.38,.32,.62-.45,1.21-.91,1.82-1.33,1.05-.73,2.11-1.43,3.16-2.16,1.32-.93,2.57-1.94,3.68-3.11,.83-.87,1.56-1.82,2.13-2.89,.62-1.17,1.01-2.4,1.13-3.72,.09-.95,.05-1.89-.23-2.81-.5-1.68-1.5-2.98-2.99-3.89Z"
                                />
                            </g>
                        </svg>
                    </ButtonsContainer>
                ) : (
                    <ButtonsContainer>
                        <svg
                            onClick={handleLike}
                            className="like-btn"
                            id="a"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 34.25 35.31"
                        >
                            <g id="b" data-name="Like">
                                <path
                                    className="like-stroke"
                                    d="M25.8,8.19c-1.45-.89-3.04-1.16-4.72-.86-1.14,.21-2.17,.69-3.06,1.43-.32,.27-.61,.57-.92,.87,0,0-.02-.02-.03-.03-.71-.84-1.58-1.47-2.59-1.88-1.13-.46-2.32-.6-3.53-.43-1.15,.17-2.18,.6-3.1,1.31-1.32,1.02-2.16,2.34-2.52,3.98-.21,.95-.17,1.91-.03,2.87,.21,1.47,.77,2.8,1.57,4.04,1,1.54,2.29,2.79,3.71,3.94,1.24,1,2.56,1.87,3.87,2.77,.76,.52,1.51,1.06,2.26,1.6,.14,.1,.27,.22,.38,.32,.62-.45,1.21-.91,1.82-1.33,1.05-.73,2.11-1.43,3.16-2.16,1.32-.93,2.57-1.94,3.68-3.11,.83-.87,1.56-1.82,2.13-2.89,.62-1.17,1.01-2.4,1.13-3.72,.09-.95,.05-1.89-.23-2.81-.5-1.68-1.5-2.98-2.99-3.89Z"
                                />
                            </g>
                        </svg>
                    </ButtonsContainer>
                )}
                <ButtonsContainer>
                    <svg
                        className="comment-btn"
                        id="a"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 34.25 35.31"
                    >
                        <path
                            id="b"
                            data-name="Commnet"
                            className="comment-stroke"
                            d="M24.64,7.21H9.61c-2.41,0-4.36,1.95-4.36,4.36v8.48c0,2.35,1.86,4.25,4.19,4.34-.71,.92-1.46,1.8-2.29,2.62l-1.12,1.1c3.18-.64,6.17-1.91,8.84-3.7h9.78c2.41,0,4.36-1.95,4.36-4.36V11.57c0-2.41-1.95-4.36-4.36-4.36Z"
                        />
                    </svg>
                </ButtonsContainer>
            </ButtonsWrapper>
        </Container>
    )
}

export default Post

const Container = styled.div`
    font-family: 'Poppins', sans-serif;
    width: 100%;
    max-width: 500px;
    background-color: ${Colors.GREY};
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 10px;
    box-shadow: ${Shadows.DROPSHADOWS};
    -webkit-box-shadow: ${Shadows.DROPSHADOWS};
    -moz-box-shadow: ${Shadows.DROPSHADOWS};
`

const TopContainer = styled.div`
    font-weight: bold;
    cursor: pointer;
`

const EmailContainer = styled.div`
    color: ${TextColor.LIGHTER};
`

const PostContainer = styled.div`
    font-size: 2rem;
    padding: 2rem;
`

const ButtonsContainer = styled.div``

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`
