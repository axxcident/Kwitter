import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

// Styled component for the container div
const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  width: 250px;
  height: 500px;
  margin: 0 auto;
  margin-top: 45px;
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
      display: flex;
      flex-direction: column;
      font-weight: bolder;
      margin-top: 9px;
      width: 250px;
      padding: 10px;
      border-radius: 7px;
`;

const SubmitButton = styled.button`
  background-color: #000;
  padding: 10px 35px;
  color: #fff;
  border-radius: 15px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  margin-top: 45px;
  cursor: pointer;
  font-size: 1.1rem;

  &:hover {
    background-color: #B2D6F8;
  }
`;

const SignInButton = styled.button`
  background: none;
  padding: 10px 35px;
  border: 2px solid #000;
  color: #000;
  border-radius: 15px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  margin-top: 45px;
  cursor: pointer;
  font-size: 1.1rem;

  &:hover {
    background-color: #fff;
  }
`;

function TestLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signupp")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    axios.post('http://localhost:8800/login', {
        email,
        password,
      })
      .then((response) => {
        console.log('User found');
        console.log(response.data[0].id);
        localStorage.setItem('userId', response.data[0].id);

        setEmail('');
        setPassword('');
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Heading>Logga in nu</Heading>
      <Form onSubmit={handleSubmit}>
        <FormField>
          Mejladress
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormField>
        <FormField>
          Lösenord
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormField>
        <SubmitButton type="submit">Logga in</SubmitButton>
      </Form>
      <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>Eller</p>
      <SignInButton type="button" onClick={handleClick} >Skapa Konto</SignInButton>
    </Container>
  );
}

export default TestLogin;
