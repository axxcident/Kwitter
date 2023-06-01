import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Post from './Post'

const backgroundImage = 'url("/kwitter-logo-3.png")'

// DENNA FUNCTION SKA BORT
function FlowContainer({ posts }) {
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
        setFlowPosts(posts)
    }, [posts])

    const getHasLike = (postId) => {
        return likesList.some((like) => like.post_id === postId)
    }

    //   SORT NYAST
    const sortPostsByNewest = (post) => {
        post.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }

    sortPostsByNewest(flowPosts)

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

export default FlowContainer

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
`

const LogoContainer = styled.div`
    background-image: ${backgroundImage};
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 150px;
    height: 150px;
`
