import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Registration= () => {
  const [registrations, setRegistrations] = useState([]);
  const [newRegistration, setNewRegistration] = useState({
    name: '',
    mail: '',
    titre: '',
    address: '',
    country: '',
    description: '',
  });

  useEffect(() => {
    // Fetch registration data from the API
    axios.get('http://localhost:8081/registrations') // Replace with your backend API endpoint
      .then(response => {
        setRegistrations(response.data);
      })
      .catch(error => {
        console.error('Error fetching registrations:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRegistration({
      ...newRegistration,
      [name]: value,
    });
  };

  const handleAddRegistration = () => {
    // Send a POST request to add a new registration
    axios.post('http://localhost:8081/registrations', newRegistration) // Replace with your backend API endpoint
      .then(response => {
        setRegistrations([...registrations, response.data]);
        setNewRegistration({
          name: '',
          mail: '',
          titre: '',
          address: '',
          country: '',
          description: '',
        });
      })
      .catch(error => {
        console.error('Error adding registration:', error);
      });
  };

  return (
    <div className="container-fluid p-0 m-0" style={{ background: 'black', color: 'white' }}>
       <div style={{ position: 'relative', textAlign: 'right', color: 'white', height: '55vh', overflow: 'hidden' }}>
                <img src={`${process.env.PUBLIC_URL}/marrakech.jpg`} alt="Marrakech" style={{ width: '100%', height: 'auto' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3em', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}>
                    DSAI 2023: 1st International Conference on Data Science & Artificial Intelligence
                    </h1>
                    <p style={{ marginTop: '1rem', fontSize: '1.5em' }}>
                        Address : Marrakech
                    </p>
                </div>
            </div>

    <div className="container mt-4">
      <h2 className="text-center mb-4">Registration Form</h2>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={newRegistration.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            name="mail"
            value={newRegistration.mail}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="titre"
            value={newRegistration.titre}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={newRegistration.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={newRegistration.country}
            onChange={handleInputChange}
          />
          <hr/>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={newRegistration.description}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddRegistration}
        >
          Add Registration
        </button>
      </form>
    </div>
    </div>
  );
};

export default Registration;
