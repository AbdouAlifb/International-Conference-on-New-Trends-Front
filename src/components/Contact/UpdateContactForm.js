import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';

const UpdateContactForm = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
  const [contact, setContact] = useState({
    email: '',
    address: '',
    cityMap: '',
  });

  const fetchContact = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/contacts/${id}`);
      setContact(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération du contact:', error.message);
    }
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/contacts/update', contact);

      console.log('Contact mis à jour avec succès:', response.data);

      navigate('/Contact/ContactList'); 
      // Rediriger ou effectuer d'autres actions après la mise à jour si nécessaire
    } catch (error) {
      console.error('Erreur lors de la mise à jour du contact:', error.message);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-3">
      <h2 className="text-center mb-4">Update Contact</h2>
    <form onSubmit={handleSubmit} >
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

      <button type="submit" className="btn btn-primary">update contact</button>
    </form>
    </div>
    </div>
  );
};

export default UpdateContactForm;
