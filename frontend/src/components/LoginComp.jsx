import { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function TestLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(email, password)

         axios.post('http://localhost:8800/login', {
           email,
           password,
         })
           .then(response => {
             console.log('User found');
             console.log(response.data[0].id)
             localStorage.setItem('userId', response.data[0].id);

             setEmail('');
             setPassword('');
             alert("Du är inloggad!")
             navigate('/')
            //  console.log(response.data)
           })
           .catch(error => {
             console.log(error);
           });
      };



      return (
        <div>
          <h2>User Form</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Log in</button>
          </form>
        </div>
      );
}

export default TestLogin
