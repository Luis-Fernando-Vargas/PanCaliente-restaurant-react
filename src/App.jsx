import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Header';
import About from './components/About';
import Menu from './components/Menu';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';

import { useCart } from './context/CartContext';

import './styles/base/reset.css';
import './styles/base/variables.css';
import './styles/base/typography.css';
import './styles/base/MediaQuery.css';

function MainContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isCartOpen, closeCart } = useCart();

  return (
    <div className="app">
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onCartClick={() => {
          const event = new CustomEvent('open-cart');
          window.dispatchEvent(event);
        }}
      />
      <About />
      <Menu />
      <div className="divider">
        <div className="divider-container container">
          <h2>Colombian Food to Start the Day</h2>
          <p>Start your day eating a delicious Colombian food</p>
          <a href="#menu" className="btn red-btn">Order now</a>
        </div>
      </div>
      <Contact />
      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
