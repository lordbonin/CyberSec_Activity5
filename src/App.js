import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

// Card component to display individual posts
const PostCard = ({ post }) => {
  // Parse the date string and format it
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Extract and format the date from the post
  const postDate = formatDate(post.date);

  // Limit the content to 100 words
  const limitContent = (content, limit) => {
    const words = content.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return content;
  };

  const limitedContent = limitContent(post.content.rendered, 50);

  return (
    <div className="post-card">
      <div className="card">
        {/* Wrap the title in an anchor tag with the post link */}
        <h2 className="card-title">
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            {post.title.rendered}
          </a>
        </h2>
        <p className="card-date">{postDate}</p>
        <div className="card-content" dangerouslySetInnerHTML={{ __html: limitedContent }} />
        {post.content.rendered.split(' ').length > 50 && (
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            <button className="read-more-button">Read More</button>
          </a>
        )}
      </div>
    </div>
  );
};

function App() {
  const adduLink = 'https://www.addu.edu.ph/wp-json/wp/v2/posts';
  const postIDs = [13157, 13161, 13136, 13147, 13126, 13102, 13090, 13171, 13060, 13034];

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
    <div className="App">
      <header className="Header1">The Official Website of AdDU Posts!</header>
      <div className='text-6xl font-bold mt-11'>AdDU Latest Posts!</div>
      <div className="App-header">
        {filteredData.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default App;
