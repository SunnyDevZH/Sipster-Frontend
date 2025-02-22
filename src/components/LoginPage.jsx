import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/home');
  };

  return (
    <div className="page login-page">
        <img src="/src/assets/Sips.less.png" alt="Logo" />
      <h1>Login</h1>
      <input type="text" placeholder="Benutzername" />
      <input type="password" placeholder="Passwort" />
      <button onClick={handleLogin}>Login</button>
      <div className="register-link">
        <span>Noch kein Account? </span>
        <a onClick={handleRegister}>Registrieren</a>
      </div>
    </div>
  );
};

export default LoginPage;