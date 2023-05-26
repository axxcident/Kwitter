import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestFetch() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8800/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <ul>
        {posts.map(post => (
            // ? poster_id?
        <div key={post.id}>
            <p>{post.post}</p>
        </div>
        ))}
      </ul>
    </div>
  );
}

export default TestFetch;
