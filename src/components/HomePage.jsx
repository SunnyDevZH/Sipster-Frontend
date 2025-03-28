import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleBack = () => {
    navigate(-1);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleMagicClick = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 5000);
  };

  const handleCheckClick = (barName) => {
    const isChecked = !checkedBars[barName];
    setCheckedBars((prevState) => ({
      ...prevState,
      [barName]: isChecked,
    }));
    setPointsAnimation({ [barName]: isChecked ? '20 Punkte' : '-20 Punkte' });
    setTimeout(() => {
      setPointsAnimation({});
    }, 2000);

    const checkedCount = Object.values({ ...checkedBars, [barName]: isChecked }).filter(Boolean).length;
    const newPoints = checkedCount * 20;

    if (newPoints <= 30) {
      setTitle('Trink-Anfänger'); // Titel aktualisiert
    } else if (newPoints <= 60) {
      setTitle('Baronaut');
    } else {
      setTitle('Tresengott');
    }
  };

  const handleColorChange = (color, profileImage) => {
    // Aktualisiere die Hintergrundfarbe und das Profilbild
    document.body.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color);
    localStorage.setItem('profilePic', profileImage);
    setBackgroundColor(color);
    setProfilePic(profileImage);
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
      <div className="icon-bar">
        <h2>Display Mode:</h2>
        <img
          src="/src/assets/boy.png"
          alt="Boy"
          className="icon"
          onClick={() => handleColorChange('cornflowerblue', '/src/assets/men.png')}
        />
        <img
          src="/src/assets/girl.png"
          alt="Girl"
          className="icon"
          onClick={() => handleColorChange('pink', '/src/assets/woman.png')}
        />
        <img
          src="/src/assets/hide.png"
          alt="Close"
          className="icon"
          onClick={() => handleColorChange('rgb(234,236,235)', '/src/assets/neutral.png')}
        />
      </div>
      <a className="back-link" onClick={handleBack}>←</a>
      <div className="profile-section" onClick={handleProfileClick}>
        <img className="profile-pic" src={profilePic} alt="Profilbild" /> {/* Dynamisches Profilbild */}
        <h2> Hello {username} ({title}) </h2>
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
        {filteredBars.map((bar) => (
          <div key={bar.id}>
            <h2>{bar.name}</h2>
            <div className="bar-details">
              <div className="bar-image-wrapper">
                {/* Bild-URL korrekt verwenden */}
                <img src={bar.image} alt={bar.name} />
                <span className="price-tag">{bar.price}</span>
              </div>
              <p>{bar.description}</p>
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
            <img src="/src/assets/shaker.png" alt="Magic" className="nav-icon" style={{ width: '24px', height: '24px' }} />
            <p>Magic</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;