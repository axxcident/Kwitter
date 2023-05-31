import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { Colors, TextColor, Shadows } from '../styles'

const PostFocusPage = () => {
  const { post_id, user_id } = useParams()
  const [singlePost, setSinglePost] = useState({})
  const [user, setUser] = useState({})

  // Hämta inlägget
  // useEffect(() => {
  //     axios
  //         .get(`http://localhost:8800/posts/${post_id}`)
  //         .then((response) => {
  //           console.log(response.data[0])
  //           setSinglePost(response.data[0])
  //         })
  //         .catch((error) => {
  //             console.error(error)
  //         })
  // }, [])

  // console.log(`http://localhost:8800/users/${user_id}`)
  // // // Hämta Användaren
  // useEffect(() => {
  //     axios
  //       .get(`http://localhost:8800/users/${user_id}`)
  //       .then((response) => {
  //         console.log(response.data[0])
  //         setUser(response.data[0])
  //       })
  //       .catch((error) => {
  //           console.error(error)
  //       })
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await axios.get(`http://localhost:8800/posts/${post_id}`);
        const userResponse = await axios.get(`http://localhost:8800/users/${user_id}`);
        setSinglePost(postResponse.data[0]);
        setUser(userResponse.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [post_id, user_id]);

  // onClick={() => goToUserPage(user.id)}
  return (
    <>
    <Container>
      <SinglePostContainer>
        {/* <TopContainer>
          {user.firstname}
        </TopContainer>
        <EmailContainer>{user.email}</EmailContainer> */}
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
