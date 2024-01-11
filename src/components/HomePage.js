import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from './Navbar';

import NewsSection from './NewsSection';


const HomePage = () => {
    const [conferenceInfo, setConferenceInfo] = useState({ title: '', address: '' });

    useEffect(() => {
        axios.get('http://localhost:8081/api/conference-info/1') // Replace with your backend URL
            .then(response => {
                setConferenceInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching conference info', error);
            });
    }, []);

    return (
        <div>
          
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
                <section>
                    <h2>Keynote Speakers</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                        {/* Replace with actual images and details of the speakers */}
                        <img src={`${process.env.PUBLIC_URL}/s1.PNG`} alt="Speaker 1" style={{ width: '15%', height: 'auto' }} />
                        <img src={`${process.env.PUBLIC_URL}/s2.PNG`} alt="Speaker 2" style={{ width: '15%', height: 'auto' }} />
                        <img src={`${process.env.PUBLIC_URL}/s3.PNG`} alt="Speaker 3" style={{ width: '15%', height: 'auto' }} />
                    </div>
                    <p>Meet our distinguished keynote speakers who are leading experts in the field of data science and AI.</p>
                </section>

                {/* Program Section */}
                <section>
                    <h2>Conference Program</h2>
                    <img src={`${process.env.PUBLIC_URL}/post.PNG`} alt="Conference Program" style={{ width: '50%', height: 'auto', marginBottom: '20px' }} />
                    <p>Check out the detailed conference program for information on sessions, talks, and events.</p>
                </section>

                {/* News Section */}
                <NewsSection />
            </div>
        </div>
    );
};

export default HomePage;
