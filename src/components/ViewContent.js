import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './styles/crudStyles.css';
const ViewContent = () => {
    const [pageContents, setPageContents] = useState([]);
    const [filter, setFilter] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/content');
                setPageContents(response.data);
            } catch (error) {
                console.error('Error fetching content', error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/content/${id}`);
            setPageContents(pageContents.filter(content => content.id !== id));
        } catch (error) {
            console.error('Error deleting content', error);
        }
    };

    const confirmDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this content?")) {
            handleDelete(id);
        }
    };

    const filteredContents = filter === 'ALL' 
        ? pageContents 
        : pageContents.filter(content => content.pageType === filter);

    const indexOfLastPost = currentPage * rowsPerPage;
    const indexOfFirstPost = indexOfLastPost - rowsPerPage;
    const currentContents = filteredContents.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredContents.length / rowsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="content-container">
                <h2>Content Management</h2>
                <div className="filter-container">
                    <label htmlFor="filter-select">Filter: </label>
                    <select id="filter-select" onChange={(e) => setFilter(e.target.value)}>
                        <option value="ALL">All</option>
                        <option value="COMMITTEES">Committees</option>
                        <option value="CALL_FOR_PAPERS">Call for Papers</option>
                    </select>
                    <div>
                        <label htmlFor="rows-select">Rows per page: </label>
                        <select id="rows-select" onChange={(e) => setRowsPerPage(parseInt(e.target.value))}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                </div>
    
                {currentContents.length === 0 ? (
                    <p>No content available.</p>
                ) : (
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentContents.map(content => (
                                <tr key={content.id}>
                                    <td>{content.title}</td>
                                    <td>
                                        {content.content.split('\n').slice(0, 2).map((line, index) => (
                                            <p key={index}>{line}</p>
                                        ))}
                                    </td>
                                    <td className="action-buttons">
        <Link to={`/update-content/${content.id}`} className="btn btn-primary me-2">
            <i className="fa fa-edit"></i>
        </Link>
        <button onClick={() => confirmDelete(content.id)} className="btn btn-danger">
            <i className="fa fa-trash"></i> 
        </button>
    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
    
                <div className="pagination">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage >= totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
    

};

export default ViewContent;
