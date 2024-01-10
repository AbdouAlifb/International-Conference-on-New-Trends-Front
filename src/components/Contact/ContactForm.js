import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';

const ContactForm = () => {
  const [contact, setContact] = useState({
    email: '',
    address: '',
    cityMap: '',
  });

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/contacts/add', contact);

      console.log('Contact ajouté avec succès:', response.data);

      // Réinitialiser les champs du formulaire si nécessaire
      setContact({
        email: '',
        address: '',
        cityMap: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du contact:', error.message);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-3">
      <h2 className="text-center mb-4">Create Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="text" className="form-control" id="email" name="email" value={contact.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address:</label>
            <input type="text" className="form-control" id="address" name="address" value={contact.address} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="cityMap" className="form-label">City Map:</label>
            <input type="text" className="form-control" id="cityMap" name="cityMap" value={contact.cityMap} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
