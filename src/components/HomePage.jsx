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

  const handleMagicClick = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 5000); // Animation für 5 Sekunden anzeigen
  };

  const handleCheckClick = (barName) => {
    setCheckedBars((prevState) => ({
      ...prevState,
      [barName]: !prevState[barName],
    }));
  };

  const handleColorChange = (color) => {
    document.body.style.backgroundColor = color;
  };

  return (
    <div className="page home-page">
      {showAnimation && (
        <div className="loading-animation">
          <img src="/src/assets/shaker.png" alt="Magic" className="loading-icon" />
        </div>
      )}
      
      <div className="icon-bar">
      <h2>Display Mode:</h2>
        <img src="/src/assets/boy.png" alt="Boy" className="icon" onClick={() => handleColorChange('cornflowerblue')} />
        <img src="/src/assets/girl.png" alt="Girl" className="icon" onClick={() => handleColorChange('pink')} />
        <img src="/src/assets/hide.png" alt="Close" className="icon" onClick={() => handleColorChange('rgb(234,236,235)')} />
      </div>
      <a className="back-link" onClick={handleBack}>←</a>
      <div className="profile-section" onClick={handleProfileClick}>
        <img className="profile-pic" src="/src/assets/profilbild.jpeg" alt="Profilbild" />
        <h2> Hi Benutzername</h2>
      </div>
      <input type="text" className="search-field" placeholder="Suche..." />
      <div className="category">
        <h2>Kategorie:</h2>
        <div className="category-items">
         <div className="category-item-wrapper">
            <div className="category-item">
                <img src="/src/assets/cocktail.png" alt="Kategorie 1" className="category-icon" />
            </div>
            <p>Drinks</p>
          </div>
          <div className="category-item-wrapper">
            <div className="category-item">
                <img src="/src/assets/champagne-glass.png" alt="Kategorie 1" className="category-icon" />
            </div>
            <p>Schaumwein</p>
          </div>
          <div className="category-item-wrapper">
            <div className="category-item">
                <img src="/src/assets/wine-bottle.png" alt="Kategorie 1" className="category-icon" />
            </div>
            <p>Wein</p>
          </div>
          <div className="category-item-wrapper">
            <div className="category-item">
                <img src="/src/assets/restaurant.png" alt="Kategorie 1" className="category-icon" />
            </div>
            <p>Apero</p>
          </div>
          <div className="category-item-wrapper">
            <div className="category-item">
                <img src="/src/assets/music.png" alt="Kategorie 1" className="category-icon" />
            </div>
            <p>Live Musik</p>
          </div>
          <div className="category-item-wrapper">
            <div className="category-item">
                <img src="/src/assets/beer2.png" alt="Kategorie 1" className="category-icon" />
            </div>
            <p>Bier</p>
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
                <img src="/src/assets/bar.jpg" alt="Bar" onClick={() => handleCheckClick(barName)} />
                <span className="price-tag">$10</span>
                <img src={checkedBars[barName] ? '/src/assets/check.png' : '/src/assets/checked.png'} alt="Check" className="check-icon"/>
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
            <img src="/src/assets/home.png" alt="Home" className="nav-icon" style={{ width: '20px', height: '20px' }} />
            Home
          </a>
        </div>
        <div className="nav-middle">
          <a href="/profile">
            <img src="/src/assets/user.png" alt="Profil" className="nav-icon" style={{ width: '20px', height: '20px' }} />
            Profil
          </a>
          </div>
        <div className="nav-right">
            <div onClick={handleMagicClick}>
                <img src="/src/assets/shaker.png" alt="Magic Bier" className="nav-icon" style={{ width: '24px', height: '24px' }} />
                <p>Magic Bier</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;