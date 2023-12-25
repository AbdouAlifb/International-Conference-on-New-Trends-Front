import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdatePoster = () => {
  const [posterData, setPosterData] = useState({
    titlePoster: '',
    descriptionPoster: '',
    contentPoster: '',
  });

  const { id } = useParams(); // Get the poster ID from the URL params

  useEffect(() => {
    // Fetch the poster data from the API using the ID
    axios.get(`http://localhost:8081/poster/get/${id}`)
      .then(response => {
        setPosterData(response.data);
      })
      .catch(error => {
        console.error('Error fetching poster data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPosterData({
      ...posterData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a PUT request to update the poster data
    axios.put(`http://localhost:8081/poster/update/${id}`, posterData)
      .then(response => {
        console.log('Poster updated successfully:', response.data);
        // Redirect to the poster list or perform another action after update
      })
      .catch(error => {
        console.error('Error updating poster:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Modifier le Poster</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titlePoster" className="form-label">Titre</label>
          <input
            type="text"
            className="form-control"
            id="titlePoster"
            name="titlePoster"
            value={posterData.titlePoster}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descriptionPoster" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="descriptionPoster"
            name="descriptionPoster"
            value={posterData.descriptionPoster}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contentPoster" className="form-label">Contenu</label>
          <textarea
            className="form-control"
            id="contentPoster"
            name="contentPoster"
            value={posterData.contentPoster}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Mettre à jour</button>
      </form>
    </div>
  );
};

export default UpdatePoster;
