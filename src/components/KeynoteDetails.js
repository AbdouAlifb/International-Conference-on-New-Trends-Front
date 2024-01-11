import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const KeynoteDetails = ({ keynote }) => {
  return (
    <Card  style={{ background: 'black', color: 'white' }}>
      <Row>
        <Col sm={10}>
          <Card.Body>
            <Card.Title style={{ color: '#f1a51c' , fontWeight: 'bold'}} ><h3>KEYNOTE:{keynote.title}</h3></Card.Title>
            <Card.Text style={{ color: 'dark' , fontWeight: 'bold'}}>{keynote.description}</Card.Text>
            <Card.Text ><span style={{ color: 'dark' , fontWeight: 'bold'}}>Abstract:</span>{keynote.content}</Card.Text>
            <Card.Text ><span style={{ color: 'dark' , fontWeight: 'bold'}}>Bio:</span>{keynote.bio}</Card.Text>
          </Card.Body>
        </Col>
        <Col sm={2}>
        <Card.Img src={ `data:image/jpeg;base64,${keynote.image}`} alt="Keynote Image" />
        </Col>

      </Row>
    </Card>
  );
};

export default KeynoteDetails;
