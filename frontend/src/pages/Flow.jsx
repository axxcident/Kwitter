import  { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import PostsContainer from '../components/PostsContainer';
// import Post from '../components/Post'

const FlowContainer = styled.div`
  margin: 100px auto;
`

function Flow() {

  const [posts, setPosts] = useState([]);
  // const [likesList, setLikesList] = useState([]);

  // Hämta likes som är associerad med en user
  // useEffect(() => {
  //   axios.get(`http://localhost:8800/likes`)
  //     .then(response => {
  //       setLikesList(response.data)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);

  // const getHasLike = (postId) => {
  //   return likesList.some(like => like.post_id === postId);
  // };

  // Hämta alla inlägg
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
    <FlowContainer>
      <PostsContainer posts={posts} />
      {/* {posts.map(post => (
        <Post
          key={post.post_id}
          user_id={post.poster_id}
          post_id={post.post_id}
          post={post.post}
          created={post.created_at}
          hasLike={getHasLike(post.post_id)}
        />
      ))} */}
    </FlowContainer>
  );
}

export default Flow;
