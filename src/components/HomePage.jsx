import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigiert zur vorherigen Seite
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navigiert zur Profilseite
  };

  return (
    <div className="page home-page">
      <a className="back-link" onClick={handleBack}>←</a>
      <div className="profile-section" onClick={handleProfileClick}>
        <img className="profile-pic" src="/src/assets/profilbild.jpeg" alt="Profilbild" />
        <p>Benutzername</p>
      </div>
      <div className="category">
        <h2>Kategorie:</h2>
        <div className="category-items">
          <div className="category-item">Kategorie 1</div>
          <div className="category-item">Kategorie 2</div>
          <div className="category-item">Kategorie 3</div>
          <div className="category-item">Kategorie 4</div>
          <div className="category-item">Kategorie 5</div>
          <div className="category-item">Kategorie 6</div>
          <div className="category-item">Kategorie 7</div>
          {/* Weitere Kategorien können hier hinzugefügt werden */}
        </div>
      </div>
      <div className="bar-container">
        <div className="bar-details">
          <h3>Bar Name 1</h3>
          <img src="/src/assets/bar.example.jpg" alt="Bar" />
          <p>Bewertung: ★★★★☆</p>
          <p>Info: Dies ist ein Beispieltext für die Bar.</p>
        </div>
        <div className="bar-details">
          <h3>Bar Name 2</h3>
          <img src="/src/assets/bar.example.jpg" alt="Bar" />
          <p>Bewertung: ★★★★☆</p>
          <p>Info: Dies ist ein Beispieltext für die Bar.</p>
        </div>
        <div className="bar-details">
          <h3>Bar Name 3</h3>
          <img src="/src/assets/bar.example.jpg" alt="Bar" />
          <p>Bewertung: ★★★★☆</p>
          <p>Info: Dies ist ein Beispieltext für die Bar.</p>
        </div>
        <div className="bar-details">
          <h3>Bar Name 4</h3>
          <img src="/src/assets/bar.example.jpg" alt="Bar" />
          <p>Bewertung: ★★★★☆</p>
          <p>Info: Dies ist ein Beispieltext für die Bar.</p>
        </div>
        <div className="bar-details">
          <h3>Bar Name 5</h3>
          <img src="/src/assets/bar.example.jpg" alt="Bar" />
          <p>Bewertung: ★★★★☆</p>
          <p>Info: Dies ist ein Beispieltext für die Bar.</p>
        </div>
      </div>
      <div className="navigation-bar">
        <a href="/home">Home</a>
        <a href="/profile">Profil</a>
        <a href="/settings">Einstellungen</a>
      </div>
    </div>
  );
};

export default HomePage;