import { useState } from 'react';
import axios from 'axios';

function TestPostInput() {

    // const [userId, setUserId] = useState('');
    const [post, setPost] = useState('');

    const poster_id = localStorage.getItem('userId');

    const handlePost = (e) => {
        e.preventDefault();

        console.log(post)
        console.log(poster_id, post)
        axios.post('http://localhost:8800/posts/submit', {
            poster_id,
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
      if(poster_id){
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
