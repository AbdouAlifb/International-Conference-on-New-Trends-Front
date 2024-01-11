import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { Alert } from 'react-bootstrap';

const UpdateConferenceInfo = () => {
    const [info, setInfo] = useState({ title: '', address: '' });
    const [showAlert, setShowAlert] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/conference-info/${id}`);
                setInfo(response.data);
            } catch (error) {
                console.error('Error fetching conference info', error);
            }
        };
        fetchInfo();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8081/api/conference-info/${id}`, info);
            console.log(response.data);
            setShowAlert(true);
        } catch (error) {
            console.error('Error updating conference info', error);
        }
    };

    const handleChange = (event) => {
        setInfo({ ...info, [event.target.name]: event.target.value });
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="content-container">
                <h2>Update Conference Information</h2>
                {showAlert && <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>Updated successfully!</Alert>}
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label>Title:</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={info.title} 
                            onChange={handleChange} 
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Address:</label>
                        <input 
                            type="text" 
                            name="address" 
                            value={info.address} 
                            onChange={handleChange} 
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Info</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateConferenceInfo;
