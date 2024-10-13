import React from 'react';
import './Header.css';

const Header = ({ language }) => {
  return (
    <header>
      <h1 className='title'>{language === "ro" ? "Joc de Trivia" : "Trivia Game"}</h1>
    </header>
  );
}

export default Header;