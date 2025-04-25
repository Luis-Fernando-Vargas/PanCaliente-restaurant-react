// src/components/Header.jsx
import React from 'react';
import '../styles/components/Header.css';
import { useCart } from '../context/CartContext';

const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  const { openCart } = useCart(); // ✅ Usamos openCart del contexto

  return (
    <header className="header-main">
      {/* Barra de navegación superior */}
      <div className="container-nav">
        <div className="content-nav container">
          <div className="logo" onClick={() => setIsMenuOpen(false)}>
            <h2>Boulangerie Pan Caliente</h2>
            <h3>
              <span className="yellow">Colom</span>
              <span className="blue">bi</span>
              <span className="red">an</span> Restaurant
            </h3>
          </div>

          <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About Us</a>
            <a href="#menu" onClick={() => setIsMenuOpen(false)}>Menu</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact Us</a>
          </nav>

          <div className="icons-header">
            {/* ✅ Ícono del carrito con openCart */}
            <button 
              className="cart-button" 
              aria-label="Open Cart"
              onClick={openCart}
            >
              <i className="fa-solid fa-basket-shopping"></i>
            </button>

            {/* Menú hamburguesa */}
            <div 
              className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Video con texto superpuesto */}
      <div className="content-header">
        <div className="container-header">
          <div className="header-text">
            <h2>Welcome!</h2>
            <a className="btn edges" href="#menu">Our Menu</a>
          </div>
          <video autoPlay loop muted playsInline>
            <source src="/assets/videos/lunch.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Fondo oscuro cuando el menú está abierto */}
      {isMenuOpen && (
        <div className="full-screen" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </header>
  );
};

export default Header;
