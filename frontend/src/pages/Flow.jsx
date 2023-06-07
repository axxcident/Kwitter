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

  const sortPostsByNewest = (posts) => {
    posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  }
  sortPostsByNewest(posts)

  return (
    <FlowContainer>
      <PostsContainer posts={posts} />
    </FlowContainer>
  );
}

export default Flow;
