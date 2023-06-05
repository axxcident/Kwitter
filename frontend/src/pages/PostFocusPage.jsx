import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
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

  const navigate = useNavigate()

  // Hämta inlägget
  useEffect(() => {
      axios.get(`http://localhost:8800/posts/${post_id}`)
          .then((response) => {
            setSinglePost(response.data[0])
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
// post_id, poster_id, comment
const handleComment = e => {
  e.preventDefault();
  axios.post('http://localhost:8800/comments/submit',
    {
      post_id: post_id,
      poster_id: poster_id,
      comment
    })
    .then(response => {
      console.log('Kommentar lagd');
      setComment('');
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
    window.location.reload()
    // navigate(`/post-focus-page/${post_id}/${poster_id}`)
};

  const goToUserPage = (id) => {
    navigate(`/userpage/${id}`)
  }

  // onClick={() => goToUserPage(user.id)}
  return (
    <>
    <Container>
      <SinglePostContainer>
        <TopContainer onClick={() => goToUserPage(user.id)}>
          {user.firstname}
        </TopContainer>
        <EmailContainer>{user.email}</EmailContainer>
        <PostContainer>{singlePost.post}</PostContainer>
      </SinglePostContainer>
      <PostCommentContainer>
        {/* <CancelLink to="/">X Avbryt</CancelLink> */}
        <CommentForm onSubmit={handleComment}>
          <br />
          <label>
            {/* <UserName>
              <h3 className="user-title">{user.firstname}</h3>
              </UserName> */}
            <CommentTextarea
              type="text"
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
            ></CommentTextarea>
          </label>
          <br />
          <CommentButton type="submit">Kommentera</CommentButton>
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

const SinglePostContainer = styled.div`
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
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`;

const CommentTextarea = styled.textarea`
  font-size: 1.5rem;
  height: 90px;
  width: 300px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
`;

const CommentButton = styled.button`
  background-color: #000;
  padding: 10px 35px;
  color: #fff;
  border-radius: 50px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  margin-top: 25px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;

  &:hover {
    background-color: ${Colors.GREY};
    color: #000;
  }
`;

// const CancelLink = styled(Link)`
//   align-self: flex-start;
//   margin-bottom: 1rem;
//   margin-left: 1rem;
//   text-decoration: none;
//   color: black;
//   font-weight: bold;
//   &:hover {
//     color: white;
//   }
// `;

// const UserName = styled.div`
//   .user-title {
//     font-size: 1.5rem;
//     margin-bottom: 10px;
//     margin-right: 100%;
//     font-family: 'Poppins', sans-serif;
//     color: #000;
//     text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
//   }`;

const ButtonsContainer = styled.div``

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`
