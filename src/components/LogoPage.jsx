import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/login');
  };

  return (
    <div className="logo-page" onClick={handleNext}>
      <img src="/src/assets/sips.ohne.png" alt="Logo" />
      <div className='logo-sipster'>
        <a>Sipster</a>
        <p>Finde deine Bar</p>
      </div>
    </div>
  );
};

export default LogoPage;