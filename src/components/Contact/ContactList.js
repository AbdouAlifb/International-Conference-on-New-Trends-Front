import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Sidebar';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of contacts from the API
    axios.get('http://localhost:8081/api/contacts/all')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }, []);

  const handleDelete = (id) => {
    // Handle contact deletion logic
    axios.delete(`http://localhost:8081/api/contacts/delete/${id}`)
      .then(response => {
        const message = `Contact with ID ${id} deleted successfully`;

        // Display alert with green color
        window.alert(
          message,
          "color: green; background-color: #dff0d8; border-color: #d6e9c6;"
        );

        // Update the list of contacts after deletion
        setContacts(contacts.filter(contact => contact.id !== id));
      })
      .catch(error => {
        console.error('Error deleting contact:', error);
      });
  };

  const handleUpdateContact = (id) => {
    // Navigate to the "UpdateContactForm" page when clicking "Update" button
    navigate(`/updateContact/${id}`);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h2 className='mt-4'>Liste des Contacts</h2><br/>
          <div className="ml-auto">
            <Link to="/Contact/CreateContact" className="btn btn-success">
              <FontAwesomeIcon icon={faPlus} /> 
            </Link>
          </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Address</th>
              <th>City Map</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.email}</td>
                <td>{contact.address}</td>
                <td>{contact.cityMap}</td>
                <td>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleUpdateContact(contact.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> {/* Edit Icon */}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(contact.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> {/* Delete Icon */}
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

export default ContactList;
