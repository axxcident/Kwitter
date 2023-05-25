import { useState } from 'react';
import axios from 'axios';

function TestLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(email, password)
        // OBS! skicka in email + password efter routes har skapats
        // axios.post('http://localhost:8800/users', {
        //   email,
        //   password,
        // })
        //   .then(response => {
        //     console.log('User found');

        //     setEmail('');
        //     setPassword('');
        //     console.log(response.data)
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
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
