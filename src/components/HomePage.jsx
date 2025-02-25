import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);
  const [checkedBars, setCheckedBars] = useState({});

  const handleBack = () => {
    navigate(-1); // Navigiert zur vorherigen Seite
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navigiert zur Profilseite
  };

  const handleMagicBierClick = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 5000); // Animation für 10 Sekunden anzeigen
  };

  const handleCheckClick = (barName) => {
    setCheckedBars((prevState) => ({
      ...prevState,
      [barName]: !prevState[barName],
    }));
  };

  return (
    <div className="page home-page">
      {showAnimation && (
        <div className="loading-animation">
          <img src="/src/assets/bier.png" alt="Magic Bier" className="loading-icon" />
        </div>
      )}
      <a className="back-link" onClick={handleBack}>←</a>
      <div className="profile-section" onClick={handleProfileClick}>
        <img className="profile-pic" src="/src/assets/profilbild.jpeg" alt="Profilbild" />
        <p>Benutzername</p>
      </div>
      <input type="text" className="search-field" placeholder="Suche..." />
      <div className="category">
        <h2>Kategorie:</h2>
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
        {['Bar Name 1', 'Bar Name 2', 'Bar Name 3', 'Bar Name 4', 'Bar Name 5'].map((barName) => (
          <div key={barName}>
            <h2>{barName}</h2>
            <div className="bar-details">
              <div className="bar-image-wrapper">
                <img src="/src/assets/bar.jpg" alt="Bar" />
                <span className="price-tag">$10</span>
                <img
                  src={checkedBars[barName] ? '/src/assets/checked.png' : '/src/assets/check.png'}
                  alt="Check"
                  className="check-icon"
                  onClick={() => handleCheckClick(barName)}
                />
              </div>
              <p>Info: Dies ist ein Beispieltext für die Bar.</p>
              <p>Adresse: Beispielstraße 1, 12345 Beispielstadt</p>
            </div>
          </div>
        ))}
      </div>
      <div className="navigation-bar">
        <div className="nav-left">
          <a href="/home">
            <img src="/src/assets/home-weiss.png" alt="Home" className="nav-icon" style={{ width: '20px', height: '20px' }} />
            Home
          </a>
        </div>
        <div className="nav-middle">
          <a href="/profile">
            <img src="/src/assets/profil-weiss.png" alt="Profil" className="nav-icon" style={{ width: '20px', height: '20px' }} />
            Profil
          </a>
          </div>
        <div className="nav-right">
            <div onClick={handleMagicBierClick}>
                <img src="/src/assets/bier.png" alt="Magic Bier" className="nav-icon" style={{ width: '24px', height: '24px' }} />
                <p>Magic Bier</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;