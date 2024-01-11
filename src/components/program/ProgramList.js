import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../Sidebar'; // Import the Sidebar component
import './../styles/crudStyles.css';

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/program/all');
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/UpdateProgram/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/program/delete/${id}`);
      setPrograms(programs.filter(program => program.id !== id));
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  const handleCreateProgram = () => {
    navigate('/Program/CreateProgram');
  };

  const getCellColor = (index) => {
      switch (index % 5) {
      case 0:
        return 'table-success';
      case 1:
        return 'table-warning';
      case 2:
        return 'table-danger';
      case 3:
        return 'table-info';
      case 4:
        return 'table-primary';
      default:
        return '';
    }
  };

  return (
    <div className="d-flex">
      <Sidebar /> {/* Include the Sidebar component */}
      <div className="container mt-4">
        <h1 className="mb-4">List of Programs</h1>
        <div>
          <FontAwesomeIcon
            icon={faPlus}
            className="btn btn-success"
            onClick={handleCreateProgram}
          />
        </div>
        <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {programs.map((program, rowIndex) => (
  <tr key={rowIndex}>
    <td className={`${getCellColor(0)} text-secondary`}>{program.name}</td>
    <td className={`${getCellColor(1)} text-secondary`}>{program.date}</td>
    <td className={`${getCellColor(2)} text-secondary`}>{program.startTime}</td>
    <td className={`${getCellColor(3)} text-secondary`}>{program.endTime}</td>
    <td className={`${getCellColor(4)} text-secondary`}>{program.description}</td>
    <td>
      <FontAwesomeIcon
        icon={faEdit}
        className="btn btn-info mr-2"
        onClick={() => handleUpdate(program.id)}
      />
      <FontAwesomeIcon
        icon={faTrashAlt}
        className="btn btn-danger"
        onClick={() => handleDelete(program.id)}
      />
    </td>
  </tr>
))}

        </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramList;
