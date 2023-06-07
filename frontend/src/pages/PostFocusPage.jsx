import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { Colors, TextColor, Shadows } from '../styles'
import CommentsContainer from '../components/CommentsContainer'

const PostFocusPage = () => {
  const { post_id, poster_id } = useParams()
  const [singlePost, setSinglePost] = useState({})
  const [user, setUser] = useState({})
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const [dateCreated, setDateCreated] = useState(null)

  const navigate = useNavigate()

  // användaren
  const loggedInUserId = localStorage.getItem('userId')

  // Hämta inlägget
  useEffect(() => {
      axios.get(`http://localhost:8800/posts/${post_id}`)
          .then((response) => {
            setSinglePost(response.data[0])
            setDateCreated(new Date(response.data[0].created_at))
          })
          .catch((error) => {
              console.error(error)
          })
  }, [])

  // Hämta Användaren
  useEffect(() => {
      axios
        .get(`http://localhost:8800/users/${poster_id}`)
        .then((response) => {
          setUser(response.data)
        })
        .catch((error) => {
            console.error(error)
        })
  }, [])

  // Hämta alla kommentarer
  useEffect(() => {
    axios.get(`http://localhost:8800/comments/${post_id}`)
        .then((response) => {
          setComments(response.data)
        })
        .catch((error) => {
            console.error(error)
        })
}, [])

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

const handleComment = e => {
  e.preventDefault();
  axios.post('http://localhost:8800/comments/submit',
    {
      post_id: post_id,
      poster_id: loggedInUserId,
      comment
    })
    .then(response => {
      setComment('');
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
    window.location.reload()
};

  const goToUserPage = (id) => {
    navigate(`/userpage/${id}`)
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
      const postId = singlePost.post_id
      const requestBody = {
          poster_id: loggedInUserId
      }
      await axios.post(`http://localhost:8800/posts/${postId}/like`,requestBody)
      console.log('Du som användare ', loggedInUserId,' har gillat inlägg nr: ', postId)
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
      const postId = singlePost.post_id
      const requestBody = {
          poster_id: loggedInUserId
      }
      await axios.post(`http://localhost:8800/posts/${postId}/dislike`,requestBody)
      console.log('Du som användare ', loggedInUserId, ' har ogillat inlägg nr: ', postId)
      window.location.reload()
  } catch (error) {
      console.error(error)
  }
}

const handleClick = () => {
  navigate('/')
}

  return (
    <>
    <Container>
      <SinglePostContainer>
      <ButtonContainer>
        <ArrowBTN
          onClick={handleClick}
          id="a"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 39.9 35.31"
        >
        <ArrowLine
          id="b"
          data-name="LINE"
          x1="28.95"
          y1="17.12"
          x2="11.12"
          y2="17.12"
        />
        <ArrowPoint
          id="c"
          data-name="POINT"
          points="19.96 8.11 10.95 17.12 19.96 26.13"
        />
        </ArrowBTN>
      </ButtonContainer>
        <PositionInfoContainer>
          <NameInfoContainer>
          <TopContainer onClick={() => goToUserPage(user.id)}>
            {user.firstname} {formatTimeDifference()}{' '}
          </TopContainer>
          <EmailContainer>{user.email}</EmailContainer>
          </NameInfoContainer>
          {singlePost.likes > 0 ? (
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
                {singlePost.likes != 0 && <span>{singlePost.likes}</span>}
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
                {singlePost.likes != 0 && <span>{singlePost.likes}</span>}
            </ButtonsContainer>
          )}
        </PositionInfoContainer>
        <PostContainer>{singlePost.post}</PostContainer>
      </SinglePostContainer>
      <PostCommentContainer>
        <CommentForm onSubmit={handleComment}>
          <label>
            <CommentTextarea
              type="text"
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
            ></CommentTextarea>
          </label>
          <BTNposition>
            <CommentButton type="submit">Kommentera</CommentButton>
          </BTNposition>
        </CommentForm>
      </PostCommentContainer>
      <CommentsContainer comments={comments} />
    </Container>
    </>
  )
}

export default PostFocusPage

const Container = styled.div`
display: flex;
/* justify-content: center; */
margin-top: 120px;
align-items: center;
flex-direction: column;
height: 100%;
`

const NameInfoContainer = styled.div`

`

const PositionInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const SinglePostContainer = styled.div`
  position: relative;
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

const PostCommentContainer = styled.div`
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


const CommentForm = styled.form`
  width: 100%;
`;

const CommentTextarea = styled.textarea`
  font-size: 1.5rem;
  height: 90px;
  /* width: 300px; */
  width: 99%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
`;

const BTNposition = styled.div`
  margin: 10px 0 0;
  display: flex;
  justify-content: end;
  @media (max-width: 501px) {
    display: block;
  }
`

const CommentButton = styled.button`
  background-color: #000;
  padding: 10px 35px;
  color: #fff;
  border-radius: 50px;
  width: 37%;
  margin: 0 4px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;

  &:hover {
    background-color: ${Colors.GREY};
    color: #000;
  }
  @media (max-width: 501px) {
    width: 97%;
  }
`;

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .edit-button {
    background-color: ${Colors.KWITTERBLUE};
    color: ${TextColor.LIGHT};
  padding: .5rem;
  border: solid black .5px;
  border-radius: 5rem;
  cursor: pointer;
  right: 2rem;
  top: 6rem;
  }
  .cancel-button {
    background-color: ${Colors.GREY};
    color: ${TextColor.LIGHT};
  padding: .5rem;
  margin-right: .25rem;
  border: solid black .5px;
  border-radius: 5rem;
  cursor: pointer;
  right: 2rem;
  top: 6rem;
  }
  .delete-button {
    background-color: ${Colors.RUSTRED};
    color: ${TextColor.LIGHT};
  padding: .5rem;
  border: solid black .5px;
  border-radius: 5rem;
  cursor: pointer;
  right: 2rem;
  top: 6rem;
  }
`



const ButtonContainer = styled.div`
    position: absolute;
    left: 0;
    top: -2rem;
    width: 40px;
    background-color: #000;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 425px) {
      left: 41vw;
      top: -5rem;
  }
`

const ArrowBTN = styled.svg`
    cursor: pointer;
    height: 40px;
`

const ArrowLine = styled.line`
    stroke: white;
    stroke-miterlimit: 205;
`

const ArrowPoint = styled.polyline`
    stroke: white;
    stroke-miterlimit: 205;
    fill: none;
`
