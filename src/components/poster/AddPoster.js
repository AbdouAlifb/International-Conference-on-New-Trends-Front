import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../Sidebar';
const AddPoster = () => {
  const [posterData, setPosterData] = useState({
    titlePoster: '',
    descriptionPoster: '',
    contentPoster: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPosterData({
      ...posterData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Appel à l'API pour sauvegarder le poster
    axios.post('http://localhost:8081/poster/save', posterData)
      .then(response => {
        console.log('Poster ajouté avec succès :', response.data);
        // Réinitialiser le formulaire après l'ajout
        setPosterData({
          titlePoster: '',
          descriptionPoster: '',
          contentPoster: '',
        });
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du poster :', error);
      });
  };

  return (
<div  className="d-flex">
    <Sidebar />
    <div className="container mt-4">
         

      <h2 className="text-center mb-4">Ajouter un Poster</h2>
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
        <button type="submit" className="btn btn-primary">Ajouter</button>
      </form>
    </div>
    </div>
  );
};

export default AddPoster;