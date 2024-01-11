import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Navbar';


const Posters = () => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    // Appel à l'API pour récupérer la liste des posters
    axios.get('http://localhost:8081/poster/all')
      .then(response => {
        setPosters(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des posters :', error);
      });
  }, []);

  return (
    <div>

    <NavigationBar />
    <div style={{ background: 'black', color: 'white' }}>
      <div style={{ position: 'relative', textAlign: 'right', color: 'white', height: '55vh', overflow: 'hidden' }}>
                <img src={`${process.env.PUBLIC_URL}/marrakech.jpg`} alt="Marrakech" style={{ width: '100%', height: 'auto' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3em', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}>
                    International Conference
                    </h1>
                    <p style={{ marginTop: '1rem', fontSize: '1.5em' }}>
                        Address : Marrakech
                    </p>
                </div>
            </div>
    <div className="container mt-4">
        
      <h2 className="text-center  bg bg-warning mb-4 ">DSAI 2023: 1st International Conference on Data Science & Artificial Intelligence
<br/>POSTERS</h2>
      <ul className="list-group">
        {posters.map(poster => (
          <li key={poster.id}>
            <h3 className="text-info" style={{color:"green"}}>{poster.titlePoster}</h3>
            <p>{poster.descriptionPoster}</p>
            <p>{poster.contentPoster}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </div>
  );
};

export default Posters;
