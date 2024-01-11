import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from './Navbar';
import { Card, Row, Col } from 'react-bootstrap';
import KeynoteDetails from './KeynoteDetails'; // Assurez-vous d'avoir le composant KeynoteDetails créé
import './styles/HomeStyle.css';
import { Link } from 'react-router-dom';
import NewsSection from './NewsSection';


const HomePage = () => {
    const [conferenceInfo, setConferenceInfo] = useState({ title: '', address: '' });
    const [keynotes, setKeynotes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/conference-info/2') // Replace with your backend URL
            .then(response => {
                setConferenceInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching conference info', error);
            });

            
    }, []);

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
          
           <NavigationBar />
            
            <div style={{ position: 'relative', textAlign: 'right', color: 'white', height: '55vh', overflow: 'hidden' }}>
                <img src={`${process.env.PUBLIC_URL}/homeimage.jpg`} alt="Marrakech" style={{ width: '100%', height: 'auto' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3em', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}>
                        {conferenceInfo.title}
                    </h1>
                    <p style={{ marginTop: '1rem', fontSize: '1.5em' }}>
                        Address: {conferenceInfo.address}
                    </p>
                    <Link to="/registration">
                        <button style={{ 
                            marginBottom: '1rem', 
                            fontSize: '1em', 
                            padding: '10px 20px', 
                            cursor: 'pointer', 
                            backgroundColor: '#ffc107', // Bootstrap warning color
                            color: 'white', // Text color
                            border: 'none', // Remove default border
                            borderRadius: '5px', // Optional: Rounded corners
                            textShadow: 'none', // Remove any text shadow
                        }}>
                            Register
                        </button>
                    </Link>

                </div>
            </div>
            {/* About Section */}
            <div className="container mt-4">
                <section>
                    <h2>About the Conference</h2>
                    {/* <img src={`${process.env.PUBLIC_URL}/data.jpg`} alt="About Conference" style={{ width: '100%', height: '200px', marginBottom: '20px' }} /> */}
                    <p>
                        
The 1st International Conference on Data Science and Artificial Intelligence (DS&AI) will take place on 27-29 November 2023, organized by the Department of Information & Communications Technologies of the Asian Institute of Technology, Thailand. The conference’s venue will be at the Berkeley Hotel Pratunam, Bangkok.

The main goal of the DS&AI conference series is to contribute to the growth of data science and artificial intelligence knowledge in developing countries in the South-East Asia region. DS&AI provide a platform for researchers and practitioners from developed and these developing countries to share their knowledge and expertise on data science and artificial intelligence and discuss the latest development in the field, so to build capacity and improve the understanding of data science and AI in the South-East Asia region. The DS&AI conference brings together researchers from different countries providing an opportunity to foster the development of partnerships and collaboration. By raising awareness and interest directly in the local community, the DS&AI conference aims to stimulate and to help the development of data science and artificial intelligence research and application in these countries.
                    </p>
                </section>

                {/* Keynote Speakers Section */}
                <section className="keynote-section">
    <h2>Keynote Speakers</h2>
    {keynotes.length > 0 ? (
        <Row>
            {keynotes.map((keynote, index) => (
                <Col md={6} key={index} className="keynote-card">
                    <Row>
                        <Col sm={4}>
                            <img 
                                src={`data:image/jpeg;base64,${keynote.image}`} 
                                alt="Keynote Speaker" 
                                className="keynote-image"
                            />
                        </Col>
                        <Col sm={8} className="keynote-content">
                            <h3 className="keynote-title">{keynote.title}</h3>
                            <p>{keynote.description}</p>
                        </Col>
                    </Row>
                </Col>
            ))}
        </Row>
    ) : (
        <p>No keynote speakers available.</p>
    )}
</section>


                {/* Program Section */}
                <section>
    <h2 className="text-center">Conference Program</h2>
    <div className="d-flex justify-content-center">
        <img 
            src={`${process.env.PUBLIC_URL}/post.PNG`} 
            alt="Conference Program" 
            className="program-image"
        />
    </div>
    <p className="text-center">Check out the detailed conference program for information on sessions, talks, and events.</p>
</section>


                {/* News Section */}
                {/* <NewsSection /> */}
            </div>
        </div>
    );
};

export default HomePage;
