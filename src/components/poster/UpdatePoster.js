import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdatePoster = ({ match }) => {
  const [posterData, setPosterData] = useState({
    titlePoster: '',
    descriptionPoster: '',
    contentPoster: '',
  });

  useEffect(() => {
    // Appel à l'API pour récupérer les données du poster à mettre à jour
    axios.get(`http://localhost:8083/poster/get/${match.params.id}`)
      .then(response => {
        setPosterData(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données du poster :', error);
      });
  }, [match.params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPosterData({
      ...posterData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Appel à l'API pour mettre à jour le poster
    axios.put(`http://localhost:8083/poster/update/${match.params.id}`, posterData)
      .then(response => {
        console.log('Poster mis à jour avec succès :', response.data);
        // Rediriger vers la liste des posters ou effectuer une autre action après la mise à jour
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du poster :', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Mettre à jour le Poster</h2>
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
