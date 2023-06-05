import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Colors, TextColor, Shadows } from '../styles'
import { useNavigate } from 'react-router-dom'

const Comment = (props) => {
  const [dateCreated, setDateCreated] = useState(null)
  const [user, setUser] = useState([])
  const [canEdit, setCanEdit] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [numberLikes, setNumberLikes] = useState(0)

      // Hämta all data om en user
      // .get(`http://localhost:8800/users/${props.user_id}`)
      useEffect(() => {
        axios
            .get(`http://localhost:8800/users/${props.user_id}`)
            .then((response) => {
                setUser(response.data)
                setDateCreated(new Date(props.created))
                // setNumberLikes(props.xLikes)
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
        // console.log(isOwner)
    }, [props.user_id])

    // Radera en kommentar
    function handleDelete(comment_id) {
      axios
          .delete(`http://localhost:8800/comments/${comment_id}/delete`)
          .then((response) => {
              console.log(response.data)
              console.log(`http://localhost:8800/comments/${comment_id}/delete`)
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

    // Likea en kommentar
  //   const handleLike = async () => {
  //     const loggedInUserId = localStorage.getItem('userId')
  //     if (!loggedInUserId) {
  //         console.log(loggedInUserId)
  //         alert('Du måste vara inloggad för att kunna gilla ett inlägg')
  //         return
  //     }
  //     try {
  //         const postId = props.post_id
  //         const requestBody = {
  //             poster_id: loggedInUserId
  //         }
  //         await axios.post(`http://localhost:8800/posts/${postId}/like`,requestBody)
  //         console.log('Du som användare ', loggedInUserId,' har gillat inlägg nr: ', postId)
  //         // setMyLike(!mylike)
  //         window.location.reload()
  //     } catch (error) {
  //         console.error(error)
  //     }
  // }

    // Un-Likea ett inlägg
  //   const handleDisLike = async () => {
  //     const loggedInUserId = localStorage.getItem('userId')
  //     if (!loggedInUserId) {
  //         console.log(loggedInUserId)
  //         alert('Du måste vara inloggad för att kunna ogilla ett inlägg')
  //         return
  //     }
  //     try {
  //         const postId = props.post_id
  //         const requestBody = {
  //             poster_id: loggedInUserId
  //         }
  //         await axios.post(`http://localhost:8800/posts/${postId}/dislike`,requestBody)
  //         console.log('Du som användare ', loggedInUserId, ' har ogillat inlägg nr: ', postId)
  //         // setMyLike(!mylike)
  //         window.location.reload()
  //     } catch (error) {
  //         console.error(error)
  //     }
  // }

    // Klicka på en användare och komm till userpage
    const goToUserPage = (id) => {
      navigate(`/userpage/${id}`)
  }


  return (
    <Container>
        <TopContainer>
            <UserInfo onClick={() => goToUserPage(user.id)}>
                {user.firstname} {user.lastname} {formatTimeDifference()}{' '}
            </UserInfo>

            <ButtonsContainer>
                {canEdit && (
                    <div>
                        {!isEditing && (
                            <button onClick={handleEdit}>Redigera</button>
                        )}
                        {isEditing && (
                            <>
                                <button onClick={handleEdit}>Avbryt</button>
                                <button
                                    onClick={() =>
                                        handleDelete(props.comment_id)
                                    }
                                >
                                    Ta bort
                                </button>
                            </>
                        )}
                    </div>
                )}
            </ButtonsContainer>
        </TopContainer>
        <PostContainer>{props.comment}</PostContainer>
    </Container>
)
}

export default Comment


const Container = styled.div`
    font-family: 'Poppins', sans-serif;
    width: 100%;
    max-width: 400px;
    background-color: ${Colors.GREY};
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 10px;
    box-shadow: ${Shadows.DROPSHADOWS};
    -webkit-box-shadow: ${Shadows.DROPSHADOWS};
    -moz-box-shadow: ${Shadows.DROPSHADOWS};
`

const TopContainer = styled.div`
display: flex;
justify-content: space-between;
`

const UserInfo = styled.div`
    font-weight: bold;
    cursor: pointer;
`

const EmailContainer = styled.div`
    color: ${TextColor.LIGHTER};
`

const PostContainer = styled.div`
    font-size: 1.5rem;
    padding: 2rem;
`

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;

    span {
        font-size: 1.5rem;
        font-weight: bold;
    }
`

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`
