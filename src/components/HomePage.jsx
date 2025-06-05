import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const HomePage = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState('/src/assets/neutral.png');
  const [backgroundColor, setBackgroundColor] = useState('rgb(234,236,235)');
  const [showAnimation, setShowAnimation] = useState(false);
  const [checkedBars, setCheckedBars] = useState(() => {
    const saved = localStorage.getItem('checkedBars');
    return saved ? JSON.parse(saved) : {};
  });
  const [pointsAnimation, setPointsAnimation] = useState({});
  const [title, setTitle] = useState('Schluck-Novize');
  const [username, setUsername] = useState('');
  const [bars, setBars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDisplayMode, setSelectedDisplayMode] = useState('');
  const [selectedBar, setSelectedBar] = useState(null);
  const [isMagicPopup, setIsMagicPopup] = useState(false);
  const [points, setPoints] = useState(0);

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
      setTitle('Trink-Anfänger');
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

    // Kategorien vom Backend laden
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/categories/');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Fehler beim Laden der Kategorien:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const storedProfilePic = localStorage.getItem('profilePic');
    const savedColor = localStorage.getItem('backgroundColor');

    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    } else {
      localStorage.setItem('profilePic', '/src/assets/neutral.png');
    }

    if (savedColor) {
      setBackgroundColor(savedColor);
      document.body.style.backgroundColor = savedColor;
    } else {
      localStorage.setItem('backgroundColor', 'rgb(234,236,235)');
    }
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleMagicClick = () => {
    setShowAnimation(true);

    setTimeout(() => {
      setShowAnimation(false);

      if (bars.length > 0) {
        const randomBar = bars[Math.floor(Math.random() * bars.length)];
        setSelectedBar(randomBar);
        setIsMagicPopup(true);
      }
    }, 5000);
  };

  const handleCheckClick = (barName) => {
    const isChecked = !checkedBars[barName];
    setCheckedBars((prevState) => {
      const updatedBars = { ...prevState, [barName]: isChecked };
      localStorage.setItem('checkedBars', JSON.stringify(updatedBars));
      return updatedBars;
    });

    const savedCheckedBars = JSON.parse(localStorage.getItem('checkedBars')) || {};
    const checkedCount = Object.values({ ...savedCheckedBars, [barName]: isChecked }).filter(Boolean).length;
    const newPoints = checkedCount * 20;
    setPoints(newPoints);
    localStorage.setItem('points', newPoints);

    if (newPoints <= 30) {
      setTitle('Trink-Anfänger');
    } else if (newPoints <= 60) {
      setTitle('Baronaut');
    } else {
      setTitle('Tresengott');
    }

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
        origin: { y: 0.6 },
      });
    }
  };

  const handleColorChange = (color, profileImage, mode) => {
    document.body.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color);
    localStorage.setItem('profilePic', profileImage);
    setBackgroundColor(color);
    setProfilePic(profileImage);
    setSelectedDisplayMode(mode);
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
        <img className="profile-pic" src={profilePic} alt="Profilbild" />
        <h2> Hallo {username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()} </h2>
      </div>

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
          {categories.map((cat) => (
            <div
              className="category-item-wrapper"
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <div className={`category-item ${selectedCategory === cat.name ? 'active' : ''}`}>
                <img src={cat.image} alt={cat.name} className="category-icon" />
              </div>
              <p>{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bar-container">
        {filteredBars.length > 0 ? (
          filteredBars.map((bar) => (
            <div key={bar.id} onClick={() => setSelectedBar(bar)}>
              <h2>{bar.name}</h2>
              <div className="bar-details">
                <div className="bar-image-wrapper">
                  <img src={bar.image} alt={bar.name} />
                  <span className="price-tag">{bar.price}</span>
                </div>
                <p>{bar.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-bars">
            <img
              src="/src/assets/nothing.png"
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
            {isMagicPopup && (
              <h2 className="magic-header">Wie wäre es mit:</h2>
            )}
            <h2>{selectedBar.name}</h2>
            <div className="close-icon" onClick={() => { setSelectedBar(null); setIsMagicPopup(false); }}>✖</div>
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
                  <div className="slider"></div>
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