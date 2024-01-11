import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

const UpdateContent = () => {
    const { id } = useParams();
    const [pageContent, setPageContent] = useState({ title: '', content: '', pageType: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8081/api/content/by-id/${id}`)
            .then(response => {
                setPageContent(response.data);
            })
            .catch(error => {
                console.error('Error fetching content', error);
                setErrorMessage('Error fetching content');
            });
    }, [id]);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8081/api/content/${id}`, pageContent);
            setSuccessMessage('Content updated successfully!');
        } catch (error) {
            console.error('Error updating content', error);
            setErrorMessage(error.response.data.message || 'Error updating content');
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
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="form-container">
                    <h2>Update Page Content</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Page Type:</label>
                            <select 
                                name="pageType" 
                                value={pageContent.pageType} 
                                onChange={handleChange}
                     
                            >
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
                            <button type="submit" className="btn">Update Content</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateContent;
