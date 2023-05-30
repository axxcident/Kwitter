import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled component for the container div
const Container = styled.div`
  width: 250px;
  height: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #B2D6F8;
  border-radius: 4px;
`;

// Styled component for the heading
const Heading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

// Styled component for the form
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

// Styled component for form fields
const FormField = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  align-items: flex-start;
  font-weight: bold;

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: 90%;
  }
`;

const SubmitButton = styled.button`
  padding: 8px 12px;
  background-color: #000;
  color: #fff;
  border: 2px solid #000;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;

  &:hover {
    background-color: #B2D6F8;
  }
`;


const SignInButton = styled.button`
  background: none;
  border: 1px solid black;
  color: #000;
  padding: 8px 12px;
  border: 2px solid #000;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;

  &:hover {
    background-color: #fff;
  }
`;

import { useNavigate } from 'react-router-dom';

function TestLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);

    axios
      .post('http://localhost:8800/login', {
        email,
        password,
      })
      .then((response) => {
        console.log('User found');
        console.log(response.data[0].id);
        localStorage.setItem('userId', response.data[0].id);

        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Heading>User Form</Heading>
      <Form onSubmit={handleSubmit}>
        <FormField>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormField>
        <FormField>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormField>
        <SubmitButton type="submit">Log in</SubmitButton>
      </Form>
      <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>Or</p>
      <SignInButton type="button">Sign in</SignInButton>
    </Container>
  );
}

export default TestLogin;
