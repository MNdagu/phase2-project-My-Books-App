import React from 'react';
import { useNavigate } from 'react-router-dom';
import landingImage from '../assets/glasses-old-books-library.jpg';


function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/collection');
  };

  return (
    <div className="landing-page">
        <div className='landing-content'>
      <h1>Welcome to Bibliophilia</h1>
      <h2>Your personal book collection manager.</h2>
      <button onClick={handleGetStarted}>Get Started</button>
      </div>
      <img src={landingImage} alt="Landing Page" className="landing-image" />
    </div>
  );
}

export default LandingPage;
