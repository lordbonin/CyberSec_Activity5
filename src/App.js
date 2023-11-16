import React, { useState, useEffect, useMemo } from 'react';
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
        <p className="mt-10 mb-10 font-semibold">| {postDate} |</p>
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
  const postIDs = useMemo(() => [13157, 13161, 13136, 13147, 13126, 13102, 13090, 13171, 13060, 13034], []);

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
      {/* Add a sticky header */}
      <header className="StickyHeader">
        <div className="ButtonRow">

          <button className="HeaderButton">KNOW DAVAO CITY</button>
          <button className="HeaderButton">DEPARTMENTS</button>
          <button className="HeaderButton">SERVICES</button>
          <button className="HeaderButton">TRANSPARENCY</button>
          <button className="HeaderButton">NEWS</button>
          <button className="HeaderButton">CONTACT US</button>

        </div>
      </header>

      <div className='text-6xl font-bold mt-11 mb-11'>AdDU Latest Posts!</div>
      <div className="App-header">
        {filteredData.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <footer className="Footer">
        <div className="FooterColumns">
          <div className="FooterColumn">
            <h3>VISIT US</h3>
            <ul>
              <li> City Government of Davao </li>
              <li> City Information Office </li>
              <li> Room 18, City Hall Bldg. </li>
              <li> San Pedro St., Davao City </li>
              <li> 8000 Philippines </li>
            </ul>

            <h3 className='mt-12'>CONTACT US</h3>
            <ul>
              <li> Tel No.: (082) 241-1000 </li>
              <li> Email Address: </li>
              <li> cio@davaocity.gov.ph </li>
            </ul>
          </div>

          <div className="FooterColumn">
            <h3>ABOUT THE LGU</h3>
            <ul>
              <li> Know Davao City </li>
              <li> Departments </li>
              <li> Services </li>
              <li> Transparency </li>
              <li> News </li>
              <li> Contact Us </li>
            </ul>

            <h3 className='mt-8'>TOURISM INFORMATION</h3>
            <ul>
              <li> Tourism </li>
            </ul>
          </div>

          <div className="FooterColumn">
            <h3>SERVICES</h3>
            <ul>
              <li> Career Opportunities </li>
              <li> Landmark Legislations </li>
              <li> Processing of Business Permits </li>
              <li> Online Payment </li>
            </ul>

            <h3 className='mt-16'>DOING BUSINESS</h3>
            <ul>
              <li> Business Bureau </li>
              <li> DCIPC </li>
            </ul>
          </div>
          <div className="FooterColumn">
            <h3>GOVERNMENT LINKS</h3>
            <ul>
              <li> Republic of the Philippines </li>
              <li> DILG </li>
              <li> DTI </li>
              <li> DepEd </li>
              <li> Tourism </li>
            </ul>

            <h3 className='mt-10'>SOCIAL MEDIA</h3>
            <ul>
              <li> Facebook </li>
              <li> Twitter </li>
            </ul>
          </div>
        </div>

      </footer>
      <footer className='Footer2'>
        <p>© 2023 Martirez, Bonin. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
