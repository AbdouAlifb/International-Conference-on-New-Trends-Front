import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src={`${process.env.PUBLIC_URL}/logo.png`} 
                        width="30" 
                        height="30" 
                        className="d-inline-block align-top"
                        alt="ICDSAI Logo"
                    />
                    ICDSAI
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link as={NavLink} to="/" className="nav-link">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/program" className="nav-link">Program</Nav.Link>
                        <Nav.Link as={NavLink} to="/keynotes" className="nav-link">Keynotes</Nav.Link>
                        <Nav.Link as={NavLink} to="/posters" className="nav-link">Posters</Nav.Link>
                        <Nav.Link as={NavLink} to="/registration" className="nav-link">Registration</Nav.Link>
                        <Nav.Link as={NavLink} to="/committees" className="nav-link">Committes</Nav.Link>
                        <Nav.Link as={NavLink} to="/papers" className="nav-link">Call of papers</Nav.Link>
                        <Nav.Link as={NavLink} to="/venue-contact" className="nav-link">Venue & Contact</Nav.Link>
                        <Nav.Link as={NavLink} to="/gallery" className="nav-link">Gallery</Nav.Link>
                        <Nav.Link as={NavLink} to="/login" className="nav-link">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
