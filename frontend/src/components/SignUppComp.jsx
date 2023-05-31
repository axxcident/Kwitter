import { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const SignUppWrap = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 250px;
  }
  form label {
    margin-top: 30px;
    font-weight: bolder;
  }
  form label, button {
    display: flex;
  }
  form input {
    margin-top: 9px;
    width: 250px;
    padding: 10px;
    border-radius: 7px;
  }
  .submitBTN {
    background-color: black;
    color: white;
    padding: 10px 35px;
    border-radius: 15px;
    margin-top: 45px;
    cursor: pointer;
    font-size: 1.1rem;

    &:hover {
      background-color: #B2D6F8;
    }
  }
`

const UserForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8800/users/submit', {
      firstname,
      lastname,
      email,
      password,
    })
      .then(response => {
        alert('Välkommen till Kwitter!');

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');

        console.log(response.data);
        navigate('/login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SignUppWrap>
      <form onSubmit={handleSubmit} id="signeraUppFormulär">
        <label>
          Användarnamn
          </label>
          <input
            type="text"
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
            required
          />
        {/* <label>
          Lastname:
          <input
            type="text"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
          />
        </label> */}
        <label>
          Mejladress
        </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        <label>
          Lösenord
        </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        {/* <button type="submit">Submit</button> */}
      </form>
      <button type="submit" form="signeraUppFormulär" className='submitBTN'>Skapa Konto</button>
    </SignUppWrap>
  );
};

export default UserForm;
