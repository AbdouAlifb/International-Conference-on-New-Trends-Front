import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Sidebar';

const KeynoteList = () => {
  const [keynotes, setKeynotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of keynotes from the API
    axios.get('http://localhost:8081/api/keynotes/all')
      .then(response => {
        setKeynotes(response.data);
      })
      .catch(error => {
        console.error('Error fetching keynotes:', error);
      });
  }, []);

  const handleDelete = (id) => {
    // Handle keynote deletion logic
    axios.delete(`http://localhost:8081/api/keynotes/delete/${id}`)
      .then(response => {
        const message = `Keynote with ID ${id} deleted successfully`;

        // Display alert with green color
        window.alert(
          message,
          "color: green; background-color: #dff0d8; border-color: #d6e9c6;"
        );

        // Update the list of keynotes after deletion
        setKeynotes(keynotes.filter(keynote => keynote.id !== id));
      })
      .catch(error => {
        console.error('Error deleting keynote:', error);
      });
  };

  const handleUpdateKeynote = (id) => {
    // Navigate to the "UpdateKeynoteForm" page when clicking "Update" button
    navigate(`/updateKeynote/${id}`);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4">
          <h2 className='mt-4'>Liste des Keynotes</h2><br/>
          <div className="ml-auto">
            <Link to="/createKeynote" className="btn btn-success">
              <FontAwesomeIcon icon={faPlus} /> 
            </Link>
          </div>
        
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {keynotes.map(keynote => (
              <tr key={keynote.id}>
                <td>{keynote.id}</td>
                <td>{keynote.title}</td>
                <td>{keynote.description}</td>
                <td>
                  <img src={`data:image/jpeg;base64,${keynote.image}`} alt="Keynote Image" />
                </td>
                <td>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleUpdateKeynote(keynote.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> {/* Edit Icon */}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(keynote.id)}
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

export default KeynoteList;
