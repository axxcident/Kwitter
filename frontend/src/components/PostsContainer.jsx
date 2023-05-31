import  { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import Post from './Post';

function PostsContainer({posts}) {

  const [flowPosts, setFlowPosts] = useState([]);
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
      setFlowPosts(posts);
  }, [posts]);

  const getHasLike = (postId) => {
    return likesList.some(like => like.post_id === postId);
  };

  // useEffect(() => {
  //   axios.get('http://localhost:8800/posts')
  //     .then(response => {
  //       setPosts(response.data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);
  // setFlowPosts(posts)

  return (
    <Container>
  {flowPosts
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map((post) => (
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
  );
}

export default PostsContainer;


const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`
