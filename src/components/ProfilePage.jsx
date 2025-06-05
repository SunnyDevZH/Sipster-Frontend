import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItem, removeItem } from '../utils/localStorageHelper';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [points, setPoints] = useState(0);
  const [title, setTitle] = useState('Trinkanfänger');
  const [profilePic, setProfilePic] = useState('/src/assets/neutral.png'); // Standard-Profilbild
  const [backgroundColor, setBackgroundColor] = useState('rgb(234,236,235)'); // Standard-Hintergrundfarbe

  useEffect(() => {
    // Lade Benutzerdaten aus dem LocalStorage
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedBirthdate = localStorage.getItem('birthdate');
    const storedProfilePic = localStorage.getItem('profilePic');
    const savedColor = localStorage.getItem('backgroundColor');

    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
    if (storedBirthdate) setBirthdate(storedBirthdate);
    if (storedProfilePic) setProfilePic(storedProfilePic);
    if (savedColor) {
      setBackgroundColor(savedColor);
      document.body.style.backgroundColor = savedColor;
    }

    // Punkte aus LocalStorage laden
    const savedPoints = parseInt(localStorage.getItem('points'), 10) || 0;
    setPoints(savedPoints);

    if (savedPoints <= 30) {
      setTitle('Trink-Anfänger');
    } else if (savedPoints <= 60) {
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

  const handleSaveChanges = async (field, selectedFile = null) => {
    try {
      let accessToken = localStorage.getItem('accessToken');
  
      // Überprüfe, ob der Token abgelaufen ist
      if (!accessToken) {
        await refreshAccessToken();
        accessToken = localStorage.getItem('accessToken');
      }
  
      // Daten vorbereiten, die aktualisiert werden sollen
      const updatedData = new FormData();
      if (field === 'username') updatedData.append('username', username);
      if (field === 'email') updatedData.append('email', email);
      if (field === 'birthdate') updatedData.append('birthdate', birthdate || '2000-01-01');
      if (field === 'password') updatedData.append('password', password);
      if (field === 'profile_picture' && (selectedFile || profilePic instanceof File)) {
        updatedData.append('profile_picture', selectedFile || profilePic);
      }
  
      const response = await fetch('http://127.0.0.1:8000/api/user/me/', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authentifizierung
        },
        body: updatedData, // Nur die geänderten Daten senden
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Aktualisiere nur die geänderten Werte im LocalStorage und State
        if (data.username) {
          localStorage.setItem('username', data.username);
          setUsername(data.username);
        }
        if (data.email) {
          localStorage.setItem('email', data.email);
          setEmail(data.email);
        }
        if (data.birthdate) {
          localStorage.setItem('birthdate', data.birthdate);
          setBirthdate(data.birthdate);
        }
        if (data.profile_picture) {
          localStorage.setItem('profilePic', data.profile_picture);
          setProfilePic(data.profile_picture);
        }
  
        alert('Änderungen erfolgreich gespeichert!');
      } else {
        console.error('Fehler beim Speichern der Änderungen:', response.statusText);
        alert('Fehler beim Speichern der Änderungen.');
      }
    } catch (error) {
      console.error('Fehler beim Speichern der Änderungen:', error);
      alert('Fehler beim Speichern der Änderungen.');
    }
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
          <button
            className="add-photo-button"
            onClick={() => document.getElementById('profile-pic-input').click()}
          >
            +
          </button>
          <input
            id="profile-pic-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const selectedFile = e.target.files[0];
                console.log('Ausgewähltes Bild:', selectedFile); // Debugging
                setProfilePic(selectedFile); // Setze das ausgewählte Bild
                handleSaveChanges(selectedFile); // Übergebe das ausgewählte Bild direkt
              }
            }}
          />
        </div>
        <p>{username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}</p>
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
            <button className="save-button" onClick={() => handleSaveChanges('username')}>
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
            <button className="save-button" onClick={() => handleSaveChanges('email')}>
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
            <button className="save-button" onClick={() => handleSaveChanges('birthdate')}>
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
              placeholder="Neues Passwort eingeben"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="save-button" onClick={() => handleSaveChanges('password')}>
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
            <div>test</div>
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