import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Colors, Shadows } from '../styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  background-color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: ${Colors.GREY};
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  box-shadow: ${Shadows.DROPSHADOWS};
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
  margin-top: 75px;
`;

const CommentForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`;

const CommentTextarea = styled.textarea`
  font-size: 1.5rem;
  height: 250px;
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
`;

const CommentButton = styled.button`
  background-color: #000;
  padding: 10px 35px;
  color: #fff;
  border-radius: 50px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  margin-top: 25px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;

  &:hover {
    background-color: ${Colors.GREY};
    color: #000;
  }
`;

const CancelLink = styled(Link)`
  align-self: flex-start;
  margin-bottom: 1rem;
  margin-left: 1rem;
  text-decoration: none;
  color: black;
  font-weight: bold;

  &:hover {
    color: white;
  }
`;

const UserName = styled.div`
  .user-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
    margin-right: 100%;
    font-family: 'Poppins', sans-serif;
    color: #000;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

function PostAPostPage() {
  const navigate = useNavigate()
  const [post, setPost] = useState('');
  const [user, setUser] = useState([]);

  const posterId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(`http://localhost:8800/users/${posterId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [posterId]);

  const handlePost = e => {
    e.preventDefault();

    axios
      .post('http://localhost:8800/posts/submit', {
        poster_id: posterId,
        post
      })
      .then(response => {
        console.log('CONNECT');

        setPost('');
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
      navigate('/')
  };

  return (
    <PageContainer>
      <Container>
        <CancelLink to="/">X Avbryt</CancelLink>
        <CommentForm onSubmit={handlePost}>
          <br />
          <label>
            <UserName>
              <h3 className="user-title">{user.firstname}</h3>
            </UserName>
            <CommentTextarea
              type="text"
              value={post}
              onChange={e => setPost(e.target.value)}
              required
            ></CommentTextarea>
          </label>
          <br />
          <CommentButton type="submit">Posta</CommentButton>
        </CommentForm>
      </Container>
    </PageContainer>
  );
}

export default PostAPostPage;
