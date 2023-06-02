import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Post from './Post'

const backgroundImage = 'url("/kwitter-logo-3.png")'
const loggedInUserId = localStorage.getItem('userId')

function PostsContainer({ posts }) {
    const [flowPosts, setFlowPosts] = useState([])
    const [likesList, setLikesList] = useState([])

    // Hämta likes som är associerad med en user
    useEffect(() => {
        axios
            .get(`http://localhost:8800/likes`)
            .then((response) => {
                setLikesList(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
      setFlowPosts(posts);
    }, [posts]);

    const getHasLike = (postId) => {
        for(let i =0; i < likesList.length; i++) {
            if(likesList[i].poster_id === parseInt(loggedInUserId, 10) && likesList[i].post_id === postId) {
                return true
            }
        }
        return false;
    }

    if (flowPosts !== null && flowPosts !== '' && flowPosts.length !== 0) {
        return (
            <Container>
                {flowPosts.map((post) => (
                    <Post
                        key={post.post_id}
                        user_id={post.poster_id}
                        post_id={post.post_id}
                        post={post.post}
                        created={post.created_at}
                        hasLike={getHasLike(post.post_id)}
                    />
                ))}
            </Container>
        )
    } else {
        return (
            <Container>
                <LogoContainer />
                <NoPosts>
                    <h1>Ooops! Inget här än amigo...</h1>
                </NoPosts>
            </Container>
        )
    }
}

export default PostsContainer

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const NoPosts = styled.div`
    font-family: 'Poppins', sans-serif;
    padding: 1rem;
    text-align: center;
    margin-bottom: 10rem;
`

const LogoContainer = styled.div`
    background-image: ${backgroundImage};
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 150px;
    height: 150px;
`
