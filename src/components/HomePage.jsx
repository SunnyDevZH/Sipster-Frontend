import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const HomePage = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState('/src/assets/neutral.png'); // Standard-Profilbild
  const [backgroundColor, setBackgroundColor] = useState('rgb(234,236,235)'); // Standard-Hintergrundfarbe
  const [showAnimation, setShowAnimation] = useState(false);
  const [checkedBars, setCheckedBars] = useState(() => {
    const saved = localStorage.getItem('checkedBars');
    return saved ? JSON.parse(saved) : {};
  });
  const [pointsAnimation, setPointsAnimation] = useState({});
  const [title, setTitle] = useState('Schluck-Novize');
  const [username, setUsername] = useState('');
  const [bars, setBars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDisplayMode, setSelectedDisplayMode] = useState(''); // State für den ausgewählten Display-Modus
  const [selectedBar, setSelectedBar] = useState(null); // State für das Modal
  const [isMagicPopup, setIsMagicPopup] = useState(false); // Neuer State
  const [points, setPoints] = useState(0); // Punkte-Status hinzufügen

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
      document.body.style.backgroundColor = savedColor;
    }

    const savedCheckedBars = JSON.parse(localStorage.getItem('checkedBars')) || {};
    const checkedCount = Object.values(savedCheckedBars).filter(Boolean).length;
    const newPoints = checkedCount * 20;

    if (newPoints <= 30) {
      setTitle('Trink-Anfänger'); // Titel aktualisiert
    } else if (newPoints <= 60) {
      setTitle('Baronaut');
    } else {
      setTitle('Tresengott');
    }

    const fetchBars = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/restaurants/');
        if (response.ok) {
          const data = await response.json();
          setBars(data);
        } else {
          console.error('Fehler beim Abrufen der Bars:', response.statusText);
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Bars:', error);
      }
    };

    fetchBars();
  }, []);

  useEffect(() => {
    // Lade Profilbild und Hintergrundfarbe aus Local Storage
    const storedProfilePic = localStorage.getItem('profilePic');
    const savedColor = localStorage.getItem('backgroundColor');

    if (storedProfilePic) {
      setProfilePic(storedProfilePic); // Profilbild aus Local Storage setzen
    } else {
      localStorage.setItem('profilePic', '/src/assets/neutral.png'); // Standard-Profilbild speichern
    }

    if (savedColor) {
      setBackgroundColor(savedColor); // Hintergrundfarbe aus Local Storage setzen
      document.body.style.backgroundColor = savedColor; // Hintergrundfarbe anwenden
    } else {
      localStorage.setItem('backgroundColor', 'rgb(234,236,235)'); // Standard-Hintergrundfarbe speichern
    }
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleMagicClick = () => {
    setShowAnimation(true);

    setTimeout(() => {
      setShowAnimation(false);

      // Wähle eine zufällige Bar aus der Liste
      if (bars.length > 0) {
        const randomBar = bars[Math.floor(Math.random() * bars.length)];
        setSelectedBar(randomBar); // Öffne das Popup mit der zufälligen Bar
        setIsMagicPopup(true); // Markiere das Popup als Magic-Popup
      }
    }, 5000); // Animation dauert 5 Sekunden
  };

  const handleCheckClick = (barName) => {
    const isChecked = !checkedBars[barName]; // Toggle den Status
    setCheckedBars((prevState) => {
      const updatedBars = { ...prevState, [barName]: isChecked };
      localStorage.setItem('checkedBars', JSON.stringify(updatedBars)); // Speichere den Status im LocalStorage
      return updatedBars;
    });

    // Punkte berechnen und speichern
    const savedCheckedBars = JSON.parse(localStorage.getItem('checkedBars')) || {};
    const checkedCount = Object.values({ ...savedCheckedBars, [barName]: isChecked }).filter(Boolean).length;
    const newPoints = checkedCount * 20;
    setPoints(newPoints);
    localStorage.setItem('points', newPoints); // Punkte im LocalStorage speichern

    // Titel basierend auf den Punkten aktualisieren
    if (newPoints <= 30) {
      setTitle('Trink-Anfänger');
    } else if (newPoints <= 60) {
      setTitle('Baronaut');
    } else {
      setTitle('Tresengott');
    }

    // Konfetti auslösen, wenn "Kenne ich schon" ausgewählt wird
    if (isChecked) {
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
      const confettiInstance = confetti.create(canvas, { resize: true });
      confettiInstance({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }, // Startpunkt des Konfettis
      });
    }
  };

  const handleColorChange = (color, profileImage, mode) => {
    // Aktualisiere die Hintergrundfarbe und das Profilbild
    document.body.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color);
    localStorage.setItem('profilePic', profileImage);
    setBackgroundColor(color);
    setProfilePic(profileImage); // Aktualisiere den State mit dem neuen Bild
    setSelectedDisplayMode(mode); // Setze den ausgewählten Display-Modus
  };

  const filteredBars = bars.filter((bar) => {
    const matchesSearch = bar.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? bar.categories.some((category) => category.name === selectedCategory)
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page home-page">
      {showAnimation && (
        <div className="loading-animation">
          <img src="/src/assets/shaker.png" alt="Magic" className="loading-icon" />
        </div>
      )}
      <div className="icon-div">
        <h2>Display Mode:</h2>
        <div className="icon-bar">
        <img
          src="/src/assets/boy.png"
          alt="Boy"
          className={`icon ${selectedDisplayMode === 'boy' ? 'active' : ''}`}
          onClick={() => handleColorChange('antiquewhite', '/src/assets/men.png', 'boy')}
        />
        <img
          src="/src/assets/girl.png"
          alt="Girl"
          className={`icon ${selectedDisplayMode === 'girl' ? 'active' : ''}`}
          onClick={() => handleColorChange('pink', '/src/assets/woman.png', 'girl')}
        />
        <img
          src="/src/assets/hide.png"
          alt="Neutral"
          className={`icon ${selectedDisplayMode === 'neutral' ? 'active' : ''}`}
          onClick={() => handleColorChange('rgb(234,236,235)', '/src/assets/neutral.png', 'neutral')}
        />
      </div>

        </div>
       
      
      <div className="profile-section" onClick={handleProfileClick}>
        <h2>{title}</h2>
        <img className="profile-pic" src={profilePic} alt="Profilbild" /> {/* Dynamisches Profilbild */}
        <h2> Hallo {username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()} </h2>
      </div>

      {/* Anzahl besuchter Bars */}
      <div className="visited-bars">
        <h2>Du kennst schon {Object.values(checkedBars).filter(Boolean).length} Bars!</h2>
      </div>

      <input
        type="text"
        className="search-field"
        placeholder="Suche..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="category">
        <h2>Kategorie:</h2>
        <div className="category-items">
          <div className="category-item-wrapper" onClick={() => setSelectedCategory('Drinks')}>
            <div className={`category-item ${selectedCategory === 'Drinks' ? 'active' : ''}`}>
              <img src="/src/assets/cocktail.png" alt="Drinks" className="category-icon" />
            </div>
            <p>Drinks</p>
          </div>
          <div className="category-item-wrapper" onClick={() => setSelectedCategory('Schaumwein')}>
            <div className={`category-item ${selectedCategory === 'Schaumwein' ? 'active' : ''}`}>
              <img src="/src/assets/champagne-glass.png" alt="Schaumwein" className="category-icon" />
            </div>
            <p>Schaumwein</p>
          </div>
          <div className="category-item-wrapper" onClick={() => setSelectedCategory('Wein')}>
            <div className={`category-item ${selectedCategory === 'Wein' ? 'active' : ''}`}>
              <img src="/src/assets/wine-bottle.png" alt="Wein" className="category-icon" />
            </div>
            <p>Wein</p>
          </div>
          <div className="category-item-wrapper" onClick={() => setSelectedCategory('Bier')}>
            <div className={`category-item ${selectedCategory === 'Bier' ? 'active' : ''}`}>
              <img src="/src/assets/beer2.png" alt="Bier" className="category-icon" />
            </div>
            <p>Bier</p>
          </div>
          <div className="category-item-wrapper" onClick={() => setSelectedCategory('Apero')}>
            <div className={`category-item ${selectedCategory === 'Apero' ? 'active' : ''}`}>
              <img src="/src/assets/restaurant.png" alt="Apero" className="category-icon" />
            </div>
            <p>Apero</p>
          </div>
          <div className="category-item-wrapper" onClick={() => setSelectedCategory('Live Musik')}>
            <div className={`category-item ${selectedCategory === 'Live Musik' ? 'active' : ''}`}>
              <img src="/src/assets/music.png" alt="Live Musik" className="category-icon" />
            </div>
            <p>Live Musik</p>
          </div>
          <div className="category-item-wrapper" onClick={() => setSelectedCategory('')}>
            <div className={`category-item ${selectedCategory === '' ? 'active' : ''}`}>
              <img src="/src/assets/alle.png" alt="Alle" className="category-icon" />
            </div>
            <p>Alle</p>
          </div>
        </div>
      </div>
      <div className="bar-container">
        {filteredBars.length > 0 ? (
          filteredBars.map((bar) => (
            <div key={bar.id} onClick={() => setSelectedBar(bar)}>
              <h2>{bar.name}</h2>
              <div className="bar-details">
                <div className="bar-image-wrapper">
                  {/* Bild-URL korrekt verwenden */}
                  <img src={bar.image} alt={bar.name} />
                  <span className="price-tag">{bar.price}</span> {/* Preisanzeige im Bild */}
                </div>
                <p>{bar.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-bars">
            <img
              src="/src/assets/nothing.png" // Pfad zu deinem Platzhalterbild
              alt="Keine Bars verfügbar"
              style={{ width: '50px', height: '50px', marginBottom: '10px' }}
            />
            <p>Es konnte leider keine Bar geladen werden, da sie im Backend (Admin) noch hinzugefügt werden muss.</p>
          </div>
        )}
      </div>
      {selectedBar && (
        <div className="modal-overlay" onClick={() => { setSelectedBar(null); setIsMagicPopup(false); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            {/* Überschrift nur anzeigen, wenn es ein Magic-Popup ist */}
            {isMagicPopup && (
            <h2 className="magic-header">Wie wäre es mit:</h2>)}
      
          <h2>{selectedBar.name}</h2>
         
            <div className="close-icon" onClick={() => { setSelectedBar(null); setIsMagicPopup(false);}}>✖</div>
            {/* Canvas für Konfetti */}
            <canvas id="confetti-canvas" className="confetti-canvas"></canvas>
            
              <div className="image-wrapper">
                <img src={selectedBar.image} alt={selectedBar.name} />
                <span className="price-tag">{selectedBar.price}</span>
              </div>
              
              <p>{selectedBar.description}</p>
              {selectedBar.address && (
                <p className='adress'><strong>Adresse:</strong> {selectedBar.address}
                {selectedBar.address && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedBar.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google-maps-link"
                >
                  <img
                    src="/src/assets/google-maps.png"
                    alt="Google Maps"
                    className="google-maps-icon"
                  />
                </a>
              )}
                
                </p>
              )}
              {selectedBar.phone && (
                <p><strong>Telefon:</strong> {selectedBar.phone}</p>
              )}
              {selectedBar.opening_hours && (
                <p><strong>Öffnungszeiten:</strong> {selectedBar.opening_hours}</p>
              )}
              {selectedBar.website && (
                <p>
                  <strong>Website:</strong>{' '}
                  <a
                    href={selectedBar.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="website-link"
                  >
                    {selectedBar.website}
                  </a>
                </p>
              )}
            {!isMagicPopup && (
              <div className="status-container">
                <p>Kennst du diese Bar schon?</p>
                <div className={`switch ${checkedBars[selectedBar.name] ? 'on' : 'off'}`} onClick={() => handleCheckClick(selectedBar.name)}>
                  <div className="slider">
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
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
            <img src="/src/assets/shaker.png" alt="Magic" className="nav-icon" style={{ width: '24px', height: '24px' }} />
            <p>Magic</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;