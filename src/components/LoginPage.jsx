import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setItem } from '../utils/localStorageHelper';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

        // Abrufen der Benutzerdaten
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
          alert('Login erfolgreich!');
          navigate('/home');
        } else {
          alert('Fehler beim Abrufen der Benutzerdaten.');
        }
      } else {
        const errorData = await response.json();
        alert(`Fehler: ${errorData.detail || 'Unbekannter Fehler'}`);
      }
    } catch (error) {
      console.error('Fehler beim Login:', error);
      alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

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
    </div>
  );
};

export default LoginPage;