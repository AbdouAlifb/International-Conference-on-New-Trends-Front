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
<NavigationBar />

        <div className="container-fluid p-0 m-0" style={{ background: 'black', color: 'white' }}>



            {/* Header Section */}
            <div style={{ position: 'relative', textAlign: 'right', color: 'white', height: '55vh', overflow: 'hidden' }}>
                <img src={`${process.env.PUBLIC_URL}/call.jpg`} alt="Marrakech" style={{ width: '100%', height: 'auto' }} />
                {/* Text removed from here */}
            </div>
            {/* Header Text Below Image */}
            <br></br>
            <h3 style={{ fontSize: '2em',  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', textAlign: 'center' }}>
                {conferenceInfo.title}
            </h3>
            <hr></hr>
    
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
        </div>
    );
    
};

export default CallForPapers;
