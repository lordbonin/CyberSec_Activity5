import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

// Card component to display individual posts
const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h2>{post.title.rendered}</h2>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
};

function App() {
  const adduLink = 'https://www.addu.edu.ph/wp-json/wp/v2/posts';
  const postIDs = [13157, 13161, 13136];

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(adduLink);
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    }

    fetchData();
  }, [postIDs]);

  // Filter the data based on the specified postIDs
  const filteredData = data.filter((value) => postIDs.includes(value.id));

  return (
    <div className=''>
      <header className="bg-blue-500 Header1">The Official Website of AdDU Posts!</header>

      <div className="App-header">
        {filteredData.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default App;
