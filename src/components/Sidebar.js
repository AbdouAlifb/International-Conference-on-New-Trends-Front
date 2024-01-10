import React, { useState } from 'react';
import { Nav, Accordion } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './styles/Sidebar.css'; // Ensure this import is here
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation(); // Get the current location
    const [openSection, setOpenSection] = useState('');
    const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

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

    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Toggle the sidebar visibility
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

                    {/* Program Section */}
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

                    {/* Gallery Section */}
                    <Accordion.Item eventKey="4">
                        <Accordion.Header onClick={() => toggleSection('gallery')}>Gallery</Accordion.Header>
                        <Accordion.Body className={openSection === 'gallery' ? 'show' : ''}>
                            <Nav className="flex-column sub-menu">
                                <LinkContainer to="/listegallery"><Nav.Link>Gallery</Nav.Link></LinkContainer>
                                {/* <LinkContainer to="/updateconferenceinfo"><Nav.Link>Update Info</Nav.Link></LinkContainer> */}
                            </Nav>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Registration Section */}
                    <Accordion.Item eventKey="5">
                        <Accordion.Header onClick={() => toggleSection('registration')}>Registration</Accordion.Header>
                        <Accordion.Body className={openSection === 'registration' ? 'show' : ''}>
                            <Nav className="flex-column sub-menu">
                                <LinkContainer to="/registrationform"><Nav.Link>Registration List</Nav.Link></LinkContainer>
                                {/* <LinkContainer to="/updateconferenceinfo"><Nav.Link>Update Info</Nav.Link></LinkContainer> */}
                            </Nav>
                        </Accordion.Body>
                    </Accordion.Item>


                    {/* Committees Section */}
                    <Accordion.Item eventKey="6">
                        <Accordion.Header onClick={() => toggleSection('content')}>Committees & Call for Papers</Accordion.Header>
                        <Accordion.Body className={openSection === 'content' ? 'show' : ''}>
                            <Nav className="flex-column sub-menu">
                                <LinkContainer to="/add-content"><Nav.Link>Create Content</Nav.Link></LinkContainer>
                                <LinkContainer to="/view-content"><Nav.Link>View Content</Nav.Link></LinkContainer>
                            </Nav>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="7">
                        <Accordion.Header onClick={() => toggleSection('')}>Contact</Accordion.Header>
                        <Accordion.Body className={openSection === 'Contact' ? 'show' : ''}>
                            <Nav className="flex-column sub-menu">
                            <LinkContainer to="/Contact/CreateContact"><Nav.Link>Create Contact</Nav.Link></LinkContainer>
                                <LinkContainer to="/Contact/ContactList"><Nav.Link>Conatcts</Nav.Link></LinkContainer>
                                {/* <LinkContainer to="/updateconferenceinfo"><Nav.Link>Update Info</Nav.Link></LinkContainer> */}
                            </Nav>
                        </Accordion.Body>
                    </Accordion.Item>


                </Accordion>
            </Nav>
        </div>
    );
};

export default Sidebar;
