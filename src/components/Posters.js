import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Posters = () => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    // Appel à l'API pour récupérer la liste des posters
    axios.get('http://localhost:8083/poster/all')
      .then(response => {
        setPosters(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des posters :', error);
      });
  }, []);

  return (
    
    <div className="container mt-4">
        
      <h2 className="text-center mb-4 text-primary">DSAI 2023: 1st International Conference on Data Science & Artificial Intelligence
<br/>POSTERS</h2>
      <ul className="list-group">
        {posters.map(poster => (
          <li key={poster.id} className="list-group-item">
            <h3 className="text-info">{poster.titlePoster}</h3>
            <p>{poster.descriptionPoster}</p>
            <p>{poster.contentPoster}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posters;
