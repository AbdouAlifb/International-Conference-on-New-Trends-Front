import React, { useState } from 'react';
import { Nav, Accordion } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './styles/Sidebar.css'; // Ensure this import is here
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation(); // Get the current location
    const [openSection, setOpenSection] = useState('');

    const isActive = (path) => {
        return location.pathname === path;
    };

    const toggleSection = (section) => {
        if (openSection === section) {
            setOpenSection('');
        } else {
            setOpenSection(section);
        }
    };

    return (
        <div className="sidebar-container">
            <Nav className="flex-column sidebar-nav">
                <Nav.Link href="/admin" className={isActive('/admin') ? 'active' : ''}>Dashboard Home</Nav.Link>

                {/* Accordion for sections */}
                <Accordion defaultActiveKey="0">
                    {/* Posters Section */}
                    <Accordion.Item eventKey="1">
                        <Accordion.Header onClick={() => toggleSection('posters')}>Posters</Accordion.Header>
                        <Accordion.Body className={openSection === 'posters' ? 'show' : ''}>
                            <Nav className="flex-column sub-menu">
                                <LinkContainer to="/addposters"><Nav.Link>Create Poster</Nav.Link></LinkContainer>
                                {/* <LinkContainer to="/updateposters"><Nav.Link>Update Poster</Nav.Link></LinkContainer> */}
                                <LinkContainer to="/listeposters"><Nav.Link>View Posters</Nav.Link></LinkContainer>
                            </Nav>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Conference Info Section */}
                    <Accordion.Item eventKey="2">
                        <Accordion.Header onClick={() => toggleSection('conferenceInfo')}>Conference Info</Accordion.Header>
                        <Accordion.Body className={openSection === 'conferenceInfo' ? 'show' : ''}>
                            <Nav className="flex-column sub-menu">
                                <LinkContainer to="/addconferenceinfo"><Nav.Link>Create Info</Nav.Link></LinkContainer>
                                {/* <LinkContainer to="/updateconferenceinfo"><Nav.Link>Update Info</Nav.Link></LinkContainer> */}
                                <LinkContainer to="/viewconferenceinfo"><Nav.Link>View Info</Nav.Link></LinkContainer>
                            </Nav>
                        </Accordion.Body>
                    </Accordion.Item>


                    <Accordion.Item eventKey="3">
                        <Accordion.Header onClick={() => toggleSection('Program')}>Program</Accordion.Header>
                        <Accordion.Body className={openSection === 'Program' ? 'show' : ''}>
                            <Nav className="flex-column sub-menu">
                                <LinkContainer to="/Program/CreateProgram"><Nav.Link>Create Program</Nav.Link></LinkContainer>
                                {/* <LinkContainer to="/updateconferenceinfo"><Nav.Link>Update Info</Nav.Link></LinkContainer> */}
                                <LinkContainer to="/Program/ProgramList"><Nav.Link>List Program</Nav.Link></LinkContainer>
                              
                            </Nav>
                        </Accordion.Body>
                    </Accordion.Item>


                    {/* Add other sections if needed */}
                    {/* ... */}
                </Accordion>
            </Nav>
        </div>
    );
};

export default Sidebar;
