import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Die Passwörter stimmen nicht überein.');
      return;
    }
    if (!isChecked) {
      alert('Bitte stimmen Sie den Datenschutzbestimmungen zu.');
      return;
    }

    // Daten an das Backend senden
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Registrierung erfolgreich!');
        navigate('/login'); 
      } else {
        const errorData = await response.json();
        alert(`Fehler: ${errorData.error || 'Unbekannter Fehler'}`);
      }
    } catch (error) {
      console.error('Fehler bei der Registrierung:', error);
      alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigiert zur vorherigen Seite
  };

  return (
    <div className="page register-page">
      <img src="/src/assets/sips.ohne.png" alt="Logo" />
      <a className="back-link" onClick={handleBack}>←</a>
      <h1>Registrieren</h1>
      <input
        type="text"
        placeholder="Benutzername"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passwort wiederholen"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrieren</button>
      <div className="checkbox-container">
        <input
          type="checkbox"
          id="privacy-policy"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor="privacy-policy">Ich stimme dem Datenschutz zu</label>
      </div>
    </div>
  );
};

export default RegisterPage;