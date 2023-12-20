import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NewsSection from './NewsSection';


const HomePage = () => {
    const [conferenceInfo, setConferenceInfo] = useState({ title: '', address: '' });

    useEffect(() => {
        axios.get('http://localhost:8081/api/conference-info/2') // Replace with your backend URL
            .then(response => {
                setConferenceInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching conference info', error);
            });
    }, []);

    return (
        <div>
            
            <div style={{ position: 'relative', textAlign: 'right', color: 'white', height: '55vh', overflow: 'hidden' }}>
                <img src={`${process.env.PUBLIC_URL}/homeimage.jpg`} alt="Marrakech" style={{ width: '100%', height: 'auto' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3em', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}>
                        {conferenceInfo.title}
                    </h1>
                    <p style={{ marginTop: '1rem', fontSize: '1.5em' }}>
                        Address: {conferenceInfo.address}
                    </p>
                </div>
            </div>
            <div className="mt-4">
                <NewsSection />
            </div>
          
        </div>
    );
};

export default HomePage;
