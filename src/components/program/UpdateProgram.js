import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faClock, faInfoCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../Sidebar'; // Import the Sidebar component
import './../styles/crudStyles.css'; // Import your CSS file

const UpdateProgram = () => {
  const { id } = useParams(); // Get the program ID from the URL
  const navigate = useNavigate(); // Access to navigate for redirection

  const [program, setProgram] = useState({
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
  });
  const [updateSuccess, setUpdateSuccess] = useState(false); // State to manage update success

  useEffect(() => {
    fetchProgram();
  }, []);

  const fetchProgram = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/program/${id}`);
      setProgram(response.data);
    } catch (error) {
      console.error('Error fetching program for update:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgram({ ...program, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/program/update?id=${id}`, program);
      setUpdateSuccess(true); // Update success flag to true
      setTimeout(() => {
        navigate('/Program/ProgramList'); // Redirect to the list of programs after 2 seconds
      }, 2000);
    } catch (error) {
      console.error('Error updating program:', error);
    }
  };

  return (
    <div className="d-flex"> {/* Flex container */}
      <Sidebar /> {/* Include the Sidebar component */}
      <div className="container mt-4">
        <h2>Update Program</h2>
        <Form onSubmit={handleUpdate}>
        <Form.Group>
          <Form.Label className="text-primary">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Name
          </Form.Label>
          <Form.Control type="text" name="name" value={program.name} onChange={handleChange} />


          </Form.Group>
        <Form.Group>
          <Form.Label className="text-danger">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            Date
          </Form.Label>
          <Form.Control type="date" name="date" value={program.date} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-warning">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            Start Time
          </Form.Label>
          <Form.Control type="time" name="startTime" value={program.startTime} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-success">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            End Time
          </Form.Label>
          <Form.Control type="time" name="endTime" value={program.endTime} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-info">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            Description
          </Form.Label>
          <Form.Control type="text" name="description" value={program.description} onChange={handleChange} />


        </Form.Group>
        {/* Other Form Groups and Controls */}
        <Button variant="primary" type="submit">
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Update
        </Button>
      </Form>
        {updateSuccess && (
          <Alert variant="success" className="mt-3">
            Program updated successfully. Redirecting to the list of programs...
          </Alert>
        )}
      </div>
    </div>
  );
};

export default UpdateProgram;
