import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleBack = () => {
    navigate(-1); // Navigiert zur vorherigen Seite
  };

  return (
    <div className="page home-page">
      <button className="back-button" onClick={handleBack}>← Zurück</button>
      <button className="profile-button" onClick={handleProfile}>Profil</button>
      <div className="category">
        <h2>Kategorie: Bars</h2>
        <div className="bar-item">
        <p>Bar Name</p>
          <img src="/src/assets/bar.example.jpg" alt="Bar" />
          
        </div>
        {/* Weitere Bars können hier hinzugefügt werden */}
      </div>
    </div>
  );
};

export default HomePage;