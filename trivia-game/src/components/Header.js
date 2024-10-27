import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header-container">
      <h1 className="title">
        <>
          <span className="main-title">TRIVIA TRAIL:</span>
          <span className="conquer">CONQUER EUROPE!</span>
        </>
      </h1>
    </header>
  );
}

export default Header;

