import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { Colors, TextColor, Shadows } from '../styles'

const PostFocusPage = () => {
  const { post_id, poster_id } = useParams()
  const [singlePost, setSinglePost] = useState({})
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  // Hämta inlägget
  useEffect(() => {
      axios.get(`http://localhost:8800/posts/${post_id}`)
          .then((response) => {
            console.log(response.data[0])
            setSinglePost(response.data[0])
          })
          .catch((error) => {
              console.error(error)
          })
  }, [])

  console.log(`http://localhost:8800/users/${poster_id}`)
  // // Hämta Användaren
  useEffect(() => {
      axios
        .get(`http://localhost:8800/users/${poster_id}`)
        .then((response) => {
          console.log(response.data)
          // console.log(response.data[0])
          setUser(response.data)
        })
        .catch((error) => {
            console.error(error)
        })
  }, [])

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
