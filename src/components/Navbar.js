import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand href="#home">
                <img
                    src={`${process.env.PUBLIC_URL}/logo.png`} // Replace [Your-Logo-File-Name] with the actual file name
                    width="30"   // Adjust width as needed
                    height="30"  // Adjust height as needed
                    className="d-inline-block align-top"
                    alt="ICDSAI Logo"
                />
                 ICDSAI
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/program">Program</Nav.Link>
                    <Nav.Link href="/keynotes">Keynotes</Nav.Link>
                    <Nav.Link href="/posters">Posters</Nav.Link>
                    <Nav.Link href="/registration">Registration</Nav.Link>
                    <Nav.Link href="/committees">Committes</Nav.Link>
                    <Nav.Link href="/papers">Call of papers</Nav.Link>
                    <Nav.Link href="/venue-contact">Venue & Contact</Nav.Link>
                    <Nav.Link href="/gallery">Gallery</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
};

export default NavigationBar;
