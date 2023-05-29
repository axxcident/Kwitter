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
    <Post key={post.poster_id} id={post.poster_id} post={post.post} created={post.created_at}/>
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
