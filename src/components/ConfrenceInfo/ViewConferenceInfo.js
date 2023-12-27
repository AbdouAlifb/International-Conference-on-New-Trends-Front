import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './../styles/crudStyles.css'; // Import the CSS

const ViewConferenceInfo = () => {
    const [conferenceInfos, setConferenceInfos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/conference-info');
                setConferenceInfos(response.data);
            } catch (error) {
                console.error('Error fetching conference infos', error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/conference-info/${id}`);
            setConferenceInfos(conferenceInfos.filter(info => info.id !== id));
        } catch (error) {
            console.error('Error deleting conference info', error);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="content-container">
                <h2>Conference Information</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {conferenceInfos.map(info => (
                            <tr key={info.id}>
                                <td>{info.id}</td>
                                <td>{info.title}</td>
                                <td>{info.address}</td>
                                <td>
                                    <Link to={`/updateconferenceinfo/${info.id}`} className="btn btn-primary me-2">Update</Link>
                                    <button onClick={() => handleDelete(info.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewConferenceInfo;
