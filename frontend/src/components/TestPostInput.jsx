import { useState } from 'react';
import axios from 'axios';

function TestPostInput() {

    // const [userId, setUserId] = useState('');
    const [post, setPost] = useState('');

    const userId = localStorage.getItem('userId');

    const handlePost = (e) => {
        e.preventDefault();

        console.log(post)
        console.log(userId, post)
        axios.post('http://localhost:8800/posts/submit', {
          userId,
          post,
        })
          .then(response => {
            console.log('CONNECT');

            setPost('');
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      };
      if(userId){
        return (
            <div>
            <h2>POST</h2>
            <form onSubmit={handlePost}>
                {/* <h1>{userId}</h1> */}
              <br />
              <label>
                Posta:
                <textarea
                  type="password"
                  value={post}
                  onChange={e => setPost(e.target.value)}
                  required
                ></textarea>
              </label>
              <br />
              <button type="submit">POST INLÄGG</button>
            </form>
          </div>
          )
      }
      else {
        return (
            <>LOGGA IN DIN JÄVEL</>
        )
      }
}

export default TestPostInput
