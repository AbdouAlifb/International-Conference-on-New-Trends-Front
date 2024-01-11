import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './styles/crudStyles.css';

const CreateContent = () => {
    const [pageContent, setPageContent] = useState({
        title: '',
        content: '',
        pageType: 'COMMITTEES'  // Default selection
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8081/api/content', pageContent);
            setSuccessMessage('Content added successfully!');
            setPageContent({ title: '', content: '', pageType: 'COMMITTEES' });
        } catch (error) {
            console.error('Error adding content', error);
            setSuccessMessage('');
        }
    };

    const handleChange = (event) => {
        setPageContent({ ...pageContent, [event.target.name]: event.target.value });
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="content-container">
                {successMessage && <div className="success-message">{successMessage}</div>}
                <div className="form-container">
                    <h2>Add Page Content</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Page Type:</label>
                            <select name="pageType" value={pageContent.pageType} onChange={handleChange}>
                                <option value="COMMITTEES">Committees</option>
                                <option value="CALL_FOR_PAPERS">Call for Papers</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Title:</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={pageContent.title} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Content:</label>
                            <textarea 
                                name="content" 
                                value={pageContent.content} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit">Add Content</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateContent;
