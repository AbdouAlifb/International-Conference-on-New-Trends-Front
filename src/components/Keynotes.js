import React, { useState, useEffect } from 'react';
import KeynoteDetails from './KeynoteDetails'; // Assurez-vous d'avoir le composant KeynoteDetails créé

const KeynoteList = () => {
  const [keynotes, setKeynotes] = useState([]);

  useEffect(() => {
    // Récupérez les données de toutes les keynotes depuis votre API (ex. fetch())
    // Mettez à jour l'état keynotes avec les données reçues
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/keynotes/all');
        if (response.ok) {
          const data = await response.json();
          setKeynotes(data);
        } else {
          console.error('Erreur lors de la récupération des keynotes');
        }
      } catch (error) {
        console.error('Erreur lors de la communication avec le serveur:', error);
      }
    };

    fetchData();
  }, []); // Assurez-vous de définir les dépendances correctement

  return (
    <div style={{ background: 'black', color: 'white' }}>
        <div style={{ position: 'relative', textAlign: 'right', color: 'white', height: '55vh', overflow: 'hidden' }}>
                <img src={`${process.env.PUBLIC_URL}/keynoteImage.jpg`} alt="Marrakech" style={{ width: '100%', height: 'auto' }} />
                </div>
                  <div style={{textAlign:'center'}}>
        <h5>DSAI 2024: 1st International Conference on Data Science & Artificial Intelligence</h5>
      <h2>KEYNOTE & INVITED TALK SESSIONS</h2>
      <p>We are honored to host the following keynote and invited speakers
        <br/>who will share with us the latest updates in the area of DS&AI.</p>
        </div>
        <div className="container mt-4">
      {keynotes.length > 0 ? (
        <div>
          {keynotes.map((keynote) => (
            <KeynoteDetails key={keynote.id} keynote={keynote} />
          ))}
        </div>
      ) : (
        <p>Aucune keynote disponible pour le moment.</p>
      )}
    </div>
   </div>
  );
};

export default KeynoteList;
