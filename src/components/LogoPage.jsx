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
      <button onClick={handleNext}>Finde dein Bar</button>
    </div>
  );
};

export default LogoPage;