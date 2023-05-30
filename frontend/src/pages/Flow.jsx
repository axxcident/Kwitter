import  { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import Post from '../components/Post'

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

function Flow() {

  const [posts, setPosts] = useState([]);
  const [likesList, setLikesList] = useState([]);

  // Hämta likes som är associerad med en user
  useEffect(() => {
    axios.get(`http://localhost:8800/likes`)
      .then(response => {
        setLikesList(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const getHasLike = (postId) => {
    return likesList.some(like => like.post_id === postId);
  };

  useEffect(() => {
    axios.get('http://localhost:8800/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      {posts.map(post => (
        <Post
          key={post.post_id}
          id={post.poster_id}
          post={post.post}
          created={post.created_at}
          hasLike={getHasLike(post.post_id)}
        />
      ))}
    </Container>
  );
}

export default Flow;
