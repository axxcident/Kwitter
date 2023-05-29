import  { useEffect, useState } from 'react';
import axios from 'axios';

import styled from 'styled-components'

import Post from './Post';

function PostsContainer() {

  const [posts, setPosts] = useState([]);


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
    <Post id={post.poster_id} post={post.post}/>
        ))}

    </Container>
  );
}

export default PostsContainer;


const Container = styled.div`
`
