import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white ">
            <Container fluid className="text-center py-3">
                {/* Logo Image */}
                <img 
                    src="/logofst.png" 
                    alt="ICDSAI Logo" 
                    style={{ maxWidth: '100px', marginRight: '10px' }} 
                />
                <p>ICDSAI Conference © 2023</p>
            </Container>
        </footer>
    );
};

export default Footer;
