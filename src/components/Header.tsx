import React from 'react';
import frogLogo from './ranare.webp'; // Update this path to where your frog logo is stored
import '../css/header.css'; // Import the CSS file

const Header = () => {
  return (
    <header>
      <img src={frogLogo} alt="Frog Logo" className="logo" />
      <h1 className="title">RanaRe</h1>
    </header>
  );
};

export default Header;
