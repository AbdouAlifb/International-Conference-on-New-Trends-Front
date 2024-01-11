import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from './Navbar';



const CallForPapers = () => {
    const [committeeData, setCommitteeData] = useState([]);
    const [conferenceInfo, setConferenceInfo] = useState({ title: '', address: '' });

    useEffect(() => {   
        // Fetching conference info
        axios.get('http://localhost:8081/api/conference-info/2') // Replace with your backend URL
            .then(response => {
                setConferenceInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching conference info', error);
            });

        // Fetching committees data
        axios.get('http://localhost:8081/api/content/CALL_FOR_PAPERS') // Adjust the URL as needed
            .then(response => {
                setCommitteeData(response.data);
            })
            .catch(error => {
                console.error('Error fetching committee data', error);
            });
    }, []);

    return (
       <div>

            {/* Header Section */}
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
            {/* Committees Table Section */}
            <div style={{ padding: '2rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        {committeeData.map((item, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #ddd', padding: '15px' }}>
                                <td style={{ padding: '15px', fontWeight: 'bold' }}>{item.title}</td>
                                <td style={{ padding: '15px' }}>{item.content}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CallForPapers;
