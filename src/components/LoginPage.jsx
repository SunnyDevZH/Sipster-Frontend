import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setItem } from '../utils/localStorageHelper';

const LoginPage = () => {

  /* Navigation Hook */
  const navigate = useNavigate();

  /* States */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState({ show: false, message: '', color: '' });

  const showPopup = (message, color) => {
    setPopup({ show: true, message, color });
    setTimeout(() => setPopup({ show: false, message: '', color: '' }), 4000);
  };

    /* Handler für Login */

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setItem('accessToken', data.access);
        setItem('refreshToken', data.refresh);

        
        const userResponse = await fetch('http://127.0.0.1:8000/api/user/me/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data.access}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setItem('username', userData.username);
          setItem('email', userData.email);

          if (userData.birthdate) {
            setItem('birthdate', userData.birthdate);
          }

          showPopup('Login erfolgreich!', 'green');
          setTimeout(() => navigate('/home'), 1500);
        } else {
          showPopup('Fehler beim Abrufen der Benutzerdaten.', 'red');
        }
      } else {
        const errorData = await response.json();
        showPopup(`Fehler: ${errorData.detail || 'Unbekannter Fehler'}`, 'red');
      }
    } catch (error) {
      console.error('Fehler beim Login:', error);
      showPopup('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.', 'red');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  /* JSX-Rückgabe der Komponente mit UI-Elementen und Eventhandlern */

  return (
    <div className="page login-page">
      <img src="/src/assets/sips.ohne.png" alt="Logo" />
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Benutzername"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <div className="register-link">
        <span>Noch kein Account? </span>
        <a onClick={handleRegister}>Registrieren</a>
      </div>
      {popup.show && (
        <button
          className={`popup-message ${popup.color}`}
          style={{ opacity: popup.show ? 1 : 0 }}
        >
          {popup.message}
        </button>
      )}
    </div>
  );
};

export default LoginPage;