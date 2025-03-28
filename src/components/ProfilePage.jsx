import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItem, removeItem } from '../utils/localStorageHelper';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('2000-01-01');
  const [password, setPassword] = useState('********');
  const [points, setPoints] = useState(0);
  const [title, setTitle] = useState('Trinkanfänger');
  const [profilePic, setProfilePic] = useState('/src/assets/neutral.png'); // Standard-Profilbild
  const [backgroundColor, setBackgroundColor] = useState('rgb(234,236,235)'); // Standard-Hintergrundfarbe

  useEffect(() => {
    // Lade Benutzerdaten aus Local Storage oder einer API
    const storedUsername = getItem('username');
    const storedEmail = getItem('email');
    const storedProfilePic = localStorage.getItem('profilePic'); // Profilbild aus Local Storage laden
    const savedColor = localStorage.getItem('backgroundColor'); // Hintergrundfarbe aus Local Storage laden

    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
    if (storedProfilePic) setProfilePic(storedProfilePic); // Profilbild setzen
    if (savedColor) {
      setBackgroundColor(savedColor); // Hintergrundfarbe aus Local Storage setzen
      document.body.style.backgroundColor = savedColor; // Hintergrundfarbe anwenden
    }

    const savedCheckedBars = JSON.parse(localStorage.getItem('checkedBars')) || {};
    const checkedCount = Object.values(savedCheckedBars).filter(Boolean).length;
    const newPoints = checkedCount * 20;
    setPoints(newPoints);

    if (newPoints <= 30) {
      setTitle('Trink-Anfänger'); // Titel aktualisiert
    } else if (newPoints <= 60) {
      setTitle('Baronaut');
    } else {
      setTitle('Tresengott');
    }
  }, []);

  const handleLogout = () => {
    // Entferne Tokens und Benutzerdaten aus Local Storage
    removeItem('accessToken');
    removeItem('refreshToken');
    removeItem('username');
    removeItem('email');
    alert('Erfolgreich ausgeloggt!');
    navigate('/login'); // Weiterleitung zur Login-Seite
  };

  const handleSaveChanges = () => {
    // Füge hier die Logik zum Speichern der Änderungen hinzu
    alert('Änderungen gespeichert');
  };

  const handleBack = () => {
    navigate(-1); // Navigiert zur vorherigen Seite
  };

  const handleColorChange = (color) => {
    document.body.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color); // Hintergrundfarbe im Local Storage speichern
  };

  return (
    <div className="page profile-page">
      <a className="back-link" onClick={handleBack}>←</a>
      <div className="profile-section">
        <div className="profile-pic-wrapper">
          <img className="profile-pic" src={profilePic} alt="Profilbild" /> {/* Dynamisches Profilbild */}
          <button className="add-photo-button">+</button>
        </div>
        <p>{username}</p>
        <h2>{title}</h2>
        <p>Um mehr Punkte zu erhalten, hacke die Bars ab, <br /> die du schon kennst!</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${points}%` }}></div>
        </div>
        <p>{points} Punkte</p>
      </div>
      <div className="input-fields">
        <div className="input-group">
          <label>Name:</label>
          <div className="input-wrapper">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="save-button">
              <img src="/src/assets/bookmark.png" alt="Ändern" className="button-icon" />
            </button>
          </div>
        </div>
        <div className="input-group">
          <label>Email:</label>
          <div className="input-wrapper">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="save-button">
              <img src="/src/assets/bookmark.png" alt="Ändern" className="button-icon" />
            </button>
          </div>
        </div>
        <div className="input-group">
          <label>Geburtsdatum:</label>
          <div className="input-wrapper">
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
            <button className="save-button">
              <img src="/src/assets/bookmark.png" alt="Ändern" className="button-icon" />
            </button>
          </div>
        </div>
        <div className="input-group">
          <label>Passwort:</label>
          <div className="input-wrapper">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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