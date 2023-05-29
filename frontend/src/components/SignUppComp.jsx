import { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8800/users/submit', {
      firstname,
      lastname,
      email,
      password,
    })
      .then(response => {
        console.log('User submitted');

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');

        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Firstname:
          <input
            type="text"
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Lastname:
          <input
            type="text"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
