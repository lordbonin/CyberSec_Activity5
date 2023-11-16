import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';

const DateTime = ({ dateTime }) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const formattedDateTime = dateTime.toLocaleString('en-US', options);

  return <span className="datetime">{formattedDateTime}</span>;
};

const TwitterLogo = () => (
  <span className="additional-content">
    | <img src={process.env.PUBLIC_URL + '/twitterLogo.png'} alt="Twitter Logo" style={{ height: '2em', verticalAlign: 'middle' }}/> Twitter
  </span>
);

const HeaderNavigation = () => (
  <header className="StickyHeader">
    <div className="ButtonRow">
      <div className="logo-container">
        <span>
          <img src={process.env.PUBLIC_URL + '/site-logo.png'} alt="Site Logo" />
          <img src={process.env.PUBLIC_URL + '/site.png'} alt="Site" />
        </span> 
      </div>
        <ul className="ButtonRow">
        <li>KNOW DAVAO CITY</li>
        <li>DEPARTMENTS</li>
        <li>SERVICES</li>
        <li>TRANSPARENCY</li>
        <li>NEWS</li>
        <li>CONTACT US</li>
        <SearchIcon />
        <AdditionalLogo />
        </ul>
    </div>
  </header>
);

const SearchIcon = () => (
  <span className="search-icon">
    <i className="fas fa-search"></i>
  </span>
);

const AdditionalLogo = () => (
  <span className="additional-logo">
    <img src={process.env.PUBLIC_URL + '/iso-logo.png'} alt="Additional Logo"/>
  </span>
);


const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const postDate = formatDate(post.date);

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
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

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

    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [postIDs]);

  const filteredData = data.filter((value) => postIDs.includes(value.id));

  return (
    <div className="App">
      <header className="Header1">
        <span>The Unofficial Website for Ateneo de Davao University!</span>
        <div className='additional-content'>
          <DateTime dateTime={currentDateTime} />
          <span className="additional-content">
            <span className="separator">|</span>
            <a href="https://www.facebook.com/your-facebook-page" target="_blank" title="Visit our Facebook Page" rel="external" className="social-link"><i className="fab fa-facebook-f"></i><small>Facebook</small></a>
            <a href="https://twitter.com/your-twitter-profile" target="_blank" title="Visit our Twitter Profile" rel="external" className="social-link"><i className="fab fa-twitter"></i><small>Twitter</small></a>
            <a href="tel:+123456789" target="_blank" title="Contact Us" rel="external" className="social-link"><i className="fas fa-phone"></i><small>Contact Us</small></a>
          </span> 
        </div>
      </header>
      <HeaderNavigation />
      <div className='addu'>AdDU Latest Posts!</div>
      <div className="App-header">
        {filteredData.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <footer className="Footer">
        <div className="footer-column">
          <h4>VISIT US</h4>
          <p>City Government of Davao</p>
          <p>City Information Office</p>
          <p>Room 18, City Hall Bldg.</p>
          <p>San Pedro St., Davao City</p>
          <p>8000 Philippines</p>

          <div className='addu'></div>

          <h4>CONTACT US</h4>
          <p>Tel No.: (082) 241-1000</p>
          <p>Email Address:</p>
          <p>cio@davaocity.gov.ph</p>
        </div>


        <div className="footer-column">
          <h4>ABOUT THE LGU</h4>
          <p>Know Davao City</p>
          <p>Departments</p>
          <p>Services</p>
          <p>Transparency</p>
          <p>News</p>
          <p>Contact Us</p>

          <div className='addu'></div>

          <h4>TOURISM INFORMATION</h4>
          <p>Tourism</p>
        </div>

        <div className="footer-column">
          <h4>SERVICES</h4>
          <p>Career Opportunities</p>
          <p>Landmark Legislations</p>
          <p>Processing of Business Permits</p>
          <p>Online Payment</p>

          <div className='addu'></div>
          <h4>Business Bureau</h4>
          <p>DCIPC</p>
        </div>

        <div className="footer-column">
          <h4>GOVERNMENT LINKS</h4>
          <p>Republic of the Philippines</p>
          <p>DILG</p>
          <p>DTI</p>
          <p>DepEd</p>
          <p>Tourism</p>

          <div className='addu'></div>
          <h4>SOCIAL MEDIA</h4>
          <p>Facebook</p>
          <p>Twitter</p>
        </div>
      </footer>
      <footer className='SecondFooter'>
      Ⓒ 2023. Lord Bonin Tortor & Anton Martirez. All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;
