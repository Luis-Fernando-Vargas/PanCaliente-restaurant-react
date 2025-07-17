import React, { useState } from 'react';
import '../styles/components/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.email = 'Invalid email';
    if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone))
      newErrors.phone = 'Phone must be in format 514-000-0000';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to send message');
        setSuccess('Message sent successfully!');
        setFormData({ name: '', lastName: '', email: '', phone: '', message: '' });
        setErrors({});
      })
      .catch(() => {
        setSuccess('Failed to send message. Try again later.');
      });
  };

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
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-form">
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Fernando" id="name" value={formData.name} onChange={handleChange} />
          {errors.name && <small style={{ color: 'red' }}>{errors.name}</small>}
        </div>
        <div className="input-form">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" placeholder="Vargas" id="lastName" value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <small style={{ color: 'red' }}>{errors.lastName}</small>}
        </div>
        <div className="input-form">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="example@example.com" id="email" value={formData.email} onChange={handleChange} />
          {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
        </div>
        <div className="input-form">
          <label htmlFor="phone">Phone</label>
          <input type="tel" placeholder="514-000-0000" id="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <small style={{ color: 'red' }}>{errors.phone}</small>}
        </div>
        <div className="input-form">
          <label htmlFor="message">Message</label>
          <textarea id="message" value={formData.message} onChange={handleChange}></textarea>
          {errors.message && <small style={{ color: 'red' }}>{errors.message}</small>}
        </div>
        <div className="btn-form">
          <input type="submit" value="Send" className="btn blue-btn" />
        </div>
        {success && <p>{success}</p>}
      </form>
    </div>
  );
};

export default Contact;
