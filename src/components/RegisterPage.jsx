import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  // Status für Popups
  const [popup, setPopup] = useState({ show: false, message: '', color: '' });

  const showPopup = (message, color) => {
    setPopup({ show: true, message, color });
    setTimeout(() => setPopup({ show: false, message: '', color: '' }), 4000);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      showPopup('Die Passwörter stimmen nicht überein.', 'red');
      return;
    }
    if (!isChecked) {
      showPopup('Bitte stimmen Sie den Datenschutzbestimmungen zu.', 'red');
      return;
    }

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
        showPopup('Registrierung erfolgreich!', 'green');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        const errorData = await response.json();
        showPopup(`Fehler: ${errorData.error || 'Unbekannter Fehler'}`, 'red');
      }
    } catch (error) {
      console.error('Fehler bei der Registrierung:', error);
      showPopup('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.', 'red');
    }
  };

  const handleBack = () => {
    navigate(-1);
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

export default RegisterPage;