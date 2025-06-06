import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItem, removeItem } from '../utils/localStorageHelper';

const ProfilePage = () => {

  /* Navigation Hook */
  const navigate = useNavigate();

  /* States */
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [points, setPoints] = useState(0);
  const [title, setTitle] = useState('Trinkanfänger');
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState('/src/assets/neutral.png');
  const [backgroundColor, setBackgroundColor] = useState('rgb(234,236,235)');
  const [popup, setPopup] = useState({ show: false, message: '', color: '' });

  useEffect(() => {
    /* Laden von Username, Email, Birthdate usw. */

    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedBirthdate = localStorage.getItem('birthdate');
    const storedProfilePic = localStorage.getItem('profilePic');
    const savedColor = localStorage.getItem('backgroundColor');

    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
    if (storedBirthdate) setBirthdate(storedBirthdate);
    if (storedProfilePic) setProfilePicUrl(storedProfilePic);
    if (savedColor) {
      setBackgroundColor(savedColor);
      document.body.style.backgroundColor = savedColor;
    }

    const savedPoints = parseInt(localStorage.getItem('points'), 10) || 0;
    setPoints(savedPoints);

    if (savedPoints <= 30) setTitle('Trink-Anfänger');
    else if (savedPoints <= 60) setTitle('Baronaut');
    else setTitle('Tresengott');
  }, []);

  const showPopup = (message, color) => {
    setPopup({ show: true, message, color });
    setTimeout(() => setPopup({ show: false, message: '', color: '' }), 4000);
  };

  /* Handler für Logout, Speichern von Änderungen und Farbauswahl */

  const handleLogout = () => {
    removeItem('accessToken');
    removeItem('refreshToken');
    removeItem('username');
    removeItem('email');
    showPopup('Erfolgreich ausgeloggt!', 'green');
    setTimeout(() => navigate('/login'), 1500);
  };

  const handleSaveChanges = async (field, selectedFile = null) => {
    try {
      let accessToken = localStorage.getItem('accessToken');
      if (!accessToken) return showPopup('Zugriff verweigert. Bitte erneut einloggen.', 'red');

      const updatedData = new FormData();

      if (field === 'username' && username !== localStorage.getItem('username')) {
        updatedData.append('username', username);
      }
      if (field === 'email' && email !== localStorage.getItem('email')) {
        updatedData.append('email', email);
      }
      if (field === 'birthdate' && birthdate !== localStorage.getItem('birthdate')) {
        updatedData.append('birthdate', birthdate || '2000-01-01');
      }
      if (field === 'password' && password) {
        updatedData.append('password', password);
      }
      if (field === 'profile_picture' && selectedFile) {
        updatedData.append('profile_picture', selectedFile);
      }

      if ([...updatedData.keys()].length === 0) {
        showPopup('Keine Änderungen vorgenommen.', 'red');
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/user/me/', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: updatedData,
      });

      if (response.ok) {
        const data = await response.json();

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
        if (field === 'profile_picture' && data.profile_picture) {
          localStorage.setItem('profilePic', data.profile_picture);
          setProfilePicUrl(data.profile_picture);
          setProfilePicFile(null);
        }

        showPopup('Änderungen erfolgreich gespeichert!', 'green');
        setPassword('');
      } else {
        showPopup('Fehler beim Speichern der Änderungen.', 'red');
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
      showPopup('Fehler beim Speichern der Änderungen.', 'red');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleColorChange = (color) => {
    document.body.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color);
    setBackgroundColor(color);
  };

  /* JSX-Rückgabe der Komponente mit UI-Elementen und Eventhandlern */

  return (
    <div className="page profile-page">
      <a className="back-link" onClick={handleBack}>←</a>
      <div className="profile-section">
        <div className="profile-pic-wrapper">
          <img
            className="profile-pic"
            src={profilePicUrl}
            alt="Profilbild"
          />
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
                setProfilePicFile(selectedFile);
                setProfilePicUrl(URL.createObjectURL(selectedFile)); // Vorschau sofort anzeigen
                handleSaveChanges('profile_picture', selectedFile);
              }
            }}
          />
        </div>
        <p>{username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}</p>
        <h2>{title}</h2>
        <p>Um mehr Punkte zu erhalten, hacke die Bars ab,<br /> die du schon kennst!</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${points}%` }}></div>
        </div>
        <p>{points} Punkte</p>
      </div>

      <div className="input-fields">
        <div className="input-group">
          <label>Name:</label>
          <div className="input-wrapper">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <button className="save-button" onClick={() => handleSaveChanges('username')}>
              <img src="/src/assets/bookmark.png" alt="Ändern" className="button-icon" />
            </button>
          </div>
        </div>
        <div className="input-group">
          <label>Email:</label>
          <div className="input-wrapper">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="save-button" onClick={() => handleSaveChanges('email')}>
              <img src="/src/assets/bookmark.png" alt="Ändern" className="button-icon" />
            </button>
          </div>
        </div>
        <div className="input-group">
          <label>Geburtsdatum:</label>
          <div className="input-wrapper">
            <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
            <button className="save-button" onClick={() => handleSaveChanges('birthdate')}>
              <img src="/src/assets/bookmark.png" alt="Ändern" className="button-icon" />
            </button>
          </div>
        </div>
        <div className="input-group">
          <label>Passwort:</label>
          <div className="input-wrapper">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Neues Passwort eingeben" />
            <button className="save-button" onClick={() => handleSaveChanges('password')}>
              <img src="/src/assets/bookmark.png" alt="Ändern" className="button-icon" />
            </button>
          </div>
        </div>
      </div>

      <button className="logout-button" onClick={handleLogout}>Ausloggen</button>
      {popup.show && (
        <button
          className={`popup-message ${popup.color}`}
          style={{ opacity: popup.show ? 1 : 0 }}
        >
          {popup.message}
        </button>
      )}
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
