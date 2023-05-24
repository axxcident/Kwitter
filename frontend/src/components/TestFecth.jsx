import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestFetch() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://avancera.app/cities')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <ul>
        {data.map(city => (
          <li key={city.id}>{city.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TestFetch;
