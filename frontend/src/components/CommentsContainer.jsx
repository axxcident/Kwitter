import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Comment from './Comment'

const backgroundImage = 'url("/kwitter-logo-3.png")'
const loggedInUserId = localStorage.getItem('userId')

function CommentsContainer({ comments }) {
    const [flowComments, setFlowComments] = useState([])
    // const [likesList, setLikesList] = useState([])

    // Hämta likes som är associerad med en user på inlägg
    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8800/likes`)
    //         .then((response) => {
    //             setLikesList(response.data)
    //         })
    //         .catch((error) => {
    //             console.error(error)
    //         })
    // }, [])

    useEffect(() => {
      setFlowComments(comments);
    }, [comments]);

    // const getHasLike = (postId) => {
    //     for(let i =0; i < likesList.length; i++) {
    //         if(likesList[i].poster_id === parseInt(loggedInUserId, 10) && likesList[i].post_id === postId) {
    //             return true
    //         }
    //     }
    //     return false;
    // }

    if (flowComments !== null && flowComments !== '' && flowComments.length !== 0) {
        return (
            <Container>
                {flowComments.map((comment) => (
                    <Comment
                        key={comment.comment_id}
                        comment_id={comment.comment_id}
                        user_id={comment.poster_id}
                        post_id={comment.post_id}
                        comment={comment.comment}
                        created={comment.created_at}
                        // hasLike={getHasLike(comment.post_id)}
                        // xLikes={comment.likes}
                    />
                ))}
            </Container>
        )
    } else {
        return (
            <Container>
                <LogoContainer />
                <NoComments>
                    <h1>Ooops! Inget här än amigo...</h1>
                </NoComments>
            </Container>
        )
    }
}

export default CommentsContainer

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const NoComments = styled.div`
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
