import React from 'react';
import '../styles/components/Contact.css';

const Contact = () => {
  return (
    <div className="contact-form container" id="contact">
      <div className="contact-information">
        <h3>Contact Us</h3>
        <p><i className="fa-solid fa-location-dot"></i> 251 Bd Saint-Joseph A, Gatineau QC J8Y 3X5</p>
        <p><i className="fas fa-phone-alt"></i> (819) 771-0682</p>
        <div className="social-media">
          <i className="fab fa-facebook-square"></i>       
        </div>
      </div>
      <form className="form">
        <div className="input-form">
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Fernando" id="name" />
        </div>
        <div className="input-form">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" placeholder="Vargas" id="last-name" />
        </div>
        <div className="input-form">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="example@example.com" id="email" />
        </div>
        <div className="input-form">
          <label htmlFor="phone">Phone</label>
          <input type="tel" placeholder="514-000-00-00" id="phone" />
        </div>
        <div className="input-form">
          <label htmlFor="message">Message</label>
          <textarea id="message"></textarea>
        </div>
        <div className="btn-form">
          <input type="submit" value="Send" className="btn blue-btn" />
        </div>
      </form>
    </div>
  );
};

export default Contact;