import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Die Passwörter stimmen nicht überein.');
      return;
    }
    if (!isChecked) {
      alert('Bitte stimmen Sie den Datenschutzbestimmungen zu.');
      return;
    }
    navigate('/home');
  };

  const handleBack = () => {
    navigate(-1); // Navigiert zur vorherigen Seite
  };

  return (
    <div className="page register-page">
      <button className="back-button" onClick={handleBack}>← Zurück</button>
      <h1>Registrieren</h1>
      <input type="text" placeholder="Benutzername" />
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
      <div className="checkbox-container">
        <input
          type="checkbox"
          id="privacy-policy"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor="privacy-policy">Datenschutzbestimmungen</label>
      </div>
      <button onClick={handleRegister}>Registrieren</button>
    </div>
  );
};

export default RegisterPage;