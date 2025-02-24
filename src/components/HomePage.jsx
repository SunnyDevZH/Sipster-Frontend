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
        <input type="text" className="search-field" placeholder="Suche..." />
      </div>
      <div className="category">
        <h2>Kategorie: Bars</h2>
        <div className="category-items">
          <div className="category-item-wrapper">
            <div className="category-item"></div>
            <p>Kategorie 1</p>
          </div>
          <div className="category-item-wrapper">
            <div className="category-item"></div>
            <p>Kategorie 2</p>
          </div>
          <div className="category-item-wrapper">
            <div className="category-item"></div>
            <p>Kategorie 3</p>
          </div>
          <div className="category-item-wrapper">
            <div className="category-item"></div>
            <p>Kategorie 4</p>
          </div>
          <div className="category-item-wrapper">
            <div className="category-item"></div>
            <p>Kategorie 5</p>
          </div>
          <div className="category-item-wrapper">
            <div className="category-item"></div>
            <p>Kategorie 6</p>
          </div>
          <div className="category-item-wrapper">
            <div className="category-item"></div>
            <p>Kategorie 7</p>
          </div>
          {/* Weitere Kategorien können hier hinzugefügt werden */}
        </div>
      </div>
      <div className="bar-container">
        <h2>Bar Name 1</h2>
        <div className="bar-details">
          <div className="bar-image-wrapper">
            <img src="/src/assets/bar.example.jpg" alt="Bar" />
            <span className="price-tag">$10</span>
          </div>
          <p>Info: Dies ist ein Beispieltext für die Bar.</p>
          <p>Adresse: Beispielstraße 1, 12345 Beispielstadt</p>
        </div>
        <h2>Bar Name 2</h2>
        <div className="bar-details">
          <div className="bar-image-wrapper">
            <img src="/src/assets/bar.example.jpg" alt="Bar" />
            <span className="price-tag">$15</span>
          </div>
          <p>Info: Dies ist ein Beispieltext für die Bar.</p>
          <p>Adresse: Beispielstraße 2, 12345 Beispielstadt</p>
        </div>
        <h2>Bar Name 3</h2>
        <div className="bar-details">
          <div className="bar-image-wrapper">
            <img src="/src/assets/bar.example.jpg" alt="Bar" />
            <span className="price-tag">$12</span>
          </div>
          <p>Info: Dies ist ein Beispieltext für die Bar.</p>
          <p>Adresse: Beispielstraße 3, 12345 Beispielstadt</p>
        </div>
        <h2>Bar Name 4</h2>
        <div className="bar-details">
          <div className="bar-image-wrapper">
            <img src="/src/assets/bar.example.jpg" alt="Bar" />
            <span className="price-tag">$8</span>
          </div>
          <p>Info: Dies ist ein Beispieltext für die Bar.</p>
          <p>Adresse: Beispielstraße 4, 12345 Beispielstadt</p>
        </div>
        <h2>Bar Name 5</h2>
        <div className="bar-details">
          <div className="bar-image-wrapper">
            <img src="/src/assets/bar.example.jpg" alt="Bar" />
            <span className="price-tag">$20</span>
          </div>
          <p>Info: Dies ist ein Beispieltext für die Bar.</p>
          <p>Adresse: Beispielstraße 5, 12345 Beispielstadt</p>
        </div>
      </div>
      <div className="navigation-bar">
        <div className="nav-left">
          <a href="/home">
            <img src="/src/assets/home-weiss.png" alt="Home" className="nav-icon" style={{ width: '24px', height: '24px' }} />
            Home
          </a>
          <a href="/profile">
            <img src="/src/assets/profil-weiss1.png" alt="Profil" className="nav-icon" style={{ width: '24px', height: '24px' }} />
            Profil
          </a>
        </div>
        <div className="nav-right">
          <a href="/magic-bier">
            <img src="/src/assets/beer.png" alt="Magic Bier" className="nav-icon" style={{ width: '24px', height: '24px' }} />
            Magic Bier
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;