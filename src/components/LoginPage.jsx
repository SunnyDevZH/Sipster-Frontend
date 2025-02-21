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
      <h1>Login</h1>
      <input type="text" placeholder="Benutzername" />
      <input type="password" placeholder="Passwort" />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Registrieren</button>
    </div>
  );
};

export default LoginPage;