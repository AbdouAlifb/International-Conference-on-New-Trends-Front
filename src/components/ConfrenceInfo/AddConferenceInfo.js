import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import '../styles/crudStyles.css'; // Ensure this import is here


const AddConferenceInfo = () => {
    const [info, setInfo] = useState({ title: '', address: '' });
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/conference-info', info);
            console.log(response.data);
            setSuccessMessage('Conference information added successfully!');
        } catch (error) {
            console.error('Error adding conference info', error);
            setSuccessMessage('');
        }
    };

    const handleChange = (event) => {
        setInfo({ ...info, [event.target.name]: event.target.value });
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="content-container">
                {successMessage && <div className="success-message">{successMessage}</div>}
                <div className="form-container">
                    <h2>Add Conference Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title:</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={info.title} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input 
                                type="text" 
                                name="address" 
                                value={info.address} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit">Add Info</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddConferenceInfo;
