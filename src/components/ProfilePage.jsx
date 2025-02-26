import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Benutzername');
  const [email, setEmail] = useState('benutzer@example.com');
  const [birthdate, setBirthdate] = useState('2000-01-01');
  const [password, setPassword] = useState('********');

  const handleLogout = () => {
    // Füge hier die Logout-Logik hinzu
    navigate('/login');
  };

  const handleSaveChanges = () => {
    // Füge hier die Logik zum Speichern der Änderungen hinzu
    alert('Änderungen gespeichert');
  };

  const handleBack = () => {
    navigate(-1); // Navigiert zur vorherigen Seite
  };

  return (
    <div className="page profile-page">
      <a className="back-link" onClick={handleBack}>←</a>
      <div className="profile-section">
        <div className="profile-pic-wrapper">
          <img className="profile-pic" src="/src/assets/profilbild.jpeg" alt="Profilbild" />
          <button className="add-photo-button">+</button>
        </div>
        <p>{username}</p>
        <h2>Trinkanfänger</h2>
        <p>Um mehr Punkte zu erhalten, hacke die Bars ab, <br /> die du schon kennst!</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: '30%' }}></div>
        </div>
        <p>30 Punkte</p>
      </div>
      <div className="input-fields">
        <div className="input-group">
          <label>Name:</label>
          <div className="input-wrapper">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <button className="save-button">
              <img src="/src/assets/bookmark.png" alt="Ändern" className="button-icon" />
            </button>
          </div>
        </div>
        <div className="input-group">
          <label>Email:</label>
          <div className="input-wrapper">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="save-button">
              <img src="/src/assets/bookmark.png" alt="Ändern" className="button-icon" />
            </button>
          </div>
        </div>
        <div className="input-group">
          <label>Geburtsdatum:</label>
          <div className="input-wrapper">
            <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
            <button className="save-button">
              <img src="/src/assets/bookmark.png" alt="Ändern" className="button-icon" />
            </button>
          </div>
        </div>
        <div className="input-group">
          <label>Passwort:</label>
          <div className="input-wrapper">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="save-button">
              <img src="/src/assets/bookmark.png" alt="Ändern" className="button-icon" />
            </button>
          </div>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>Ausloggen</button>
      <div className="navigation-bar">
        <div className="nav-left">
          <a href="/home">
            <img src="/src/assets/home.png" alt="Home" className="nav-icon" style={{ width: '20px', height: '20px' }} />
            Home
          </a>
        </div>
        <div className="nav-middle">
          <a href="/profile">
            <img src="/src/assets/user.png" alt="Profil" className="nav-icon" style={{ width: '20px', height: '20px' }} />
            Profil
          </a>
        </div>
        <div className="nav-right">
          <a href="/home">
            <img src="/src/assets/shaker.png" alt="Magic" className="nav-icon" style={{ width: '24px', height: '24px' }} />
            Magic
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;