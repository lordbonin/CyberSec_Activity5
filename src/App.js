// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // You can keep or remove this line based on your styling preferences
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://www.addu.edu.ph/wp-json/wp/v2/posts');
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      {/* Your JSX code goes here */}
      <ul>
        {data.map((value) => (
          <li key={value.id}>
            <h2>{value.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: value.content.rendered }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
