import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/login');
  };

  return (
    <div className="logo-page">
      <img src="/src/assets/Sips.less.png" alt="Logo" />
      <div className='logo-sipster'>
        <a onClick={handleNext}>Sipster</a>
        <p>Finde deine Bar hier</p>
      </div>
    </div>
  );
};

export default LogoPage;