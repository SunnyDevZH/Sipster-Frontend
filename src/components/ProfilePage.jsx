import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigiert zur vorherigen Seite
  };

  return (
    <div className="page profile-page">
      <button className="back-button" onClick={handleBack}>← Zurück</button>
      <h1>Profilseite</h1>
      <img src="/src/assets/profile-pic.png" alt="Profilbild" />
      <p>Benutzername</p>
      {/* Weitere Profilinformationen */}
    </div>
  );
};

export default ProfilePage;