import React from 'react';
import '../styles/components/About.css';

const About = () => {
  return (
    <div className="container-us container" id="about">
      <div className="us-text">
        <p className="welcome">Welcome to!</p>
        <h1>Boulangerie Pan Caliente</h1>
        <p>At Boulangerie Pancaliente, we combine the artistry of French baking with the vibrant flavors of Colombian cuisine. From fresh empanadas and cheesy pandebonos to traditional bandeja paisa and ajiaco, every dish is made with love and the finest local ingredients.
          Our goal is simple: to bring you an authentic taste of Colombia, served with warmth and care. Come for the flavor, stay for the experience.</p>
      </div>
      <div className="us-images">
        <div className="img1">
          <img 
            src="/assets/images/colombian restaurant.jpg" 
            alt="People eating in restaurant"
            loading="lazy"
          />
        </div>
        <div className="imgs2">
          <img 
            src="/assets/images/eating in restaurant.avif" 
            alt="Colombian dish"
            loading="lazy"
          />
          <img 
            src="/assets/images/bandeja paisa.png" 
            alt="Colombian dishes"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default About;