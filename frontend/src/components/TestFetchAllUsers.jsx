  import { useEffect, useState } from 'react';
  import axios from 'axios';

  function TestAxios() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8800/users')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    return (
      <div>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.firstname} {user.lastname}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  export default TestAxios;
