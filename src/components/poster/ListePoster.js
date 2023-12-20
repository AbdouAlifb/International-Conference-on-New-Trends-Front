import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import 'bootstrap/dist/css/bootstrap.min.css';

const Listeposter = () => {
  const [posters, setPosters] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Fetch the list of posters from the API
    axios.get('http://localhost:8083/poster/all')
      .then(response => {
        setPosters(response.data);
      })
      .catch(error => {
        console.error('Error fetching posters:', error);
      });
  }, []);

  const handleDelete = (id) => {
    // Handle poster deletion logic
    axios.delete(`http://localhost:8083/poster/delete/${id}`)
      .then(response => {
        console.log(`Poster with ID ${id} deleted successfully`);
        // Update the list of posters after deletion
        setPosters(posters.filter(poster => poster.id !== id));
      })
      .catch(error => {
        console.error('Error deleting poster:', error);
      });
  };

  const handleUpdatePoster = (id) => {
    // Navigate to the "UpdatePoster" page when clicking "Modifier" button
    navigate(`/updateposters/${id}`);
  };

  const handleCreatePoster = () => {
    // Navigate to the "AddPoster" page when clicking "Créer Poster" button
    navigate('/addposters');
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Liste des Posters (Admin)</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posters.map(poster => (
            <tr key={poster.id}>
              <td>{poster.id}</td>
              <td>{poster.titlePoster}</td>
              <td>{poster.descriptionPoster}</td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleUpdatePoster(poster.id)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(poster.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <button
          className="btn btn-success"
          onClick={handleCreatePoster}
        >
          Créer Poster
        </button>
      </div>
    </div>
  );
};

export default Listeposter;
