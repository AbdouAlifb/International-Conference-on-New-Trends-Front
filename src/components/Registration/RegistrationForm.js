import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../Sidebar';

const RegistrationForm = () => {
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
    axios.get('http://localhost:8081/registrations')
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
    axios.post('http://localhost:8081/registrations', newRegistration)
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

  const handleValidateRegistration = (id) => {
    axios.post(`http://localhost:8081/registrations/${id}/validate`)
      .then(() => {
        // Refresh the registrations list after validation
        axios.get('http://localhost:8081/registrations')
          .then(response => {
            setRegistrations(response.data);
          })
          .catch(error => {
            console.error('Error fetching registrations:', error);
          });
      })
      .catch(error => {
        console.error('Error validating registration:', error);
      });
  };

  const handleDeleteRegistration = (id) => {
    axios.delete(`http://localhost:8081/registrations/${id}`)
      .then(() => {
        setRegistrations(registrations.filter(registration => registration.id !== id));
      })
      .catch(error => {
        console.error('Error deleting registration:', error);
      });
  };

  return (
    <div  className="d-flex">
    <Sidebar />
    <div className="container mt-4">
      <h2 className="text-center mb-4">Registration Management</h2>

     

      <h3>Registrations List</h3>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Title</th>
            <th>Address</th>
            <th>content</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map(registration => (
            <tr key={registration.id}>
              <td>{registration.id}</td>
              <td>{registration.name}</td>
              <td>{registration.mail}</td>
              <td>{registration.titre}</td>
              <td>{registration.address}</td>
              <td>{registration.country}</td>
              <td>{registration.description}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleValidateRegistration(registration.id)}
                >
                  Valider
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteRegistration(registration.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default RegistrationForm;
