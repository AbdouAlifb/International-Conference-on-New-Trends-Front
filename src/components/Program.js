import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Navbar';


const groupProgramsByDate = (programs) => {
  const groupedPrograms = {};
  programs.forEach((program) => {
    const dateKey = program.date;

    if (!groupedPrograms[dateKey]) {
      groupedPrograms[dateKey] = [];
    }

    groupedPrograms[dateKey].push(program);
  });
  return groupedPrograms;
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', options);
};

// Assuming startTime and endTime are in 'HH:MM:SS' format
const convertToValidDate = (timeString) => {
  console.log('Time:', timeString); // Verify time data
  if (timeString) {
    const [hours, minutes, seconds] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10));
    return date;
  }
  return null;
};

const Program = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const response = await axios.get('http://localhost:8081/api/program/all');
        const groupedPrograms = groupProgramsByDate(response.data);
        setPrograms(groupedPrograms);
      } catch (error) {
        console.error('Error fetching programs: ', error);
      }
    }
    fetchPrograms();
  }, []);

  return (
    <div>

            <NavigationBar />
    <div className="container-fluid p-0 m-0" style={{ background: 'black', color: 'white' }}>
      <img
        src="/img.jpg"
        alt="Conference Background"
        className="w-100"
        style={{ objectFit: 'cover', objectPosition: 'center', maxHeight: '80vh' }}
      />
      <div className="container p-4">
        <h2 className="text-center  ">ICDSAI 2023: 2st International Conference on Data Science & Artificial Intelligence</h2>
        <h1 className="text-center  ">CONFERENCE PROGRAM</h1>
        <div>
          {Object.keys(programs).map((date, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h3>{formatDate(date)}</h3>
              <ul className="list-unstyled">
                {programs[date].map((program) => (
                  <li key={program.id} style={{ fontSize: '1rem', marginBottom: '20px' }}>
                    <div className="row">
                      <div className="col-md-3">
                        <p className="mb-0">
                          {program.startTime} - {program.endTime}
                        </p>
                      </div>
                      <div className="col-md-9">
                        <div className="row">
                          <div className="col">
                            <p className="mb-0"><strong>{program.name}</strong></p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <p className="mb-0">{program.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Program;