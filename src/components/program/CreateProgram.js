import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faClock, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Sidebar from '../Sidebar'; // Import the Sidebar component

const CreateProgram = () => {
  const [newProgram, setNewProgram] = useState({
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
  });
  const [createSuccess, setCreateSuccess] = useState(false);
  const navigate = useNavigate(); // Get access to the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProgram({ ...newProgram, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/program/create', newProgram);

      setCreateSuccess(true);
      setTimeout(() => {
        navigate('/Program/ProgramList'); // Redirect to ProgramList after successful creation
      }, 2000);
    } catch (error) {
      console.error('Error creating program:', error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h2>Create New Program</h2>
        <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="text-primary">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Name
          </Form.Label>
          <Form.Control type="text" name="name" onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-danger">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            Date
          </Form.Label>
          <Form.Control type="date" name="date" onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-warning">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            Start Time
          </Form.Label>
          <Form.Control type="time" name="startTime" onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-success">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            End Time
          </Form.Label>
          <Form.Control type="time" name="endTime" onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-info">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            Description
          </Form.Label>
          <Form.Control type="text" name="description" onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Create
        </Button>
      </Form>
        {createSuccess && (
          <Alert variant="success" className="mt-3">
            Program created successfully.
          </Alert>
        )}
      </div>
    </div>
  );
};

export default CreateProgram;
