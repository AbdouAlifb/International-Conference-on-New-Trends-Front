import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import NavigationBar from './Navbar';
const VenueContact = () => {
  const [images, setImages] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);
  const position = [31.6346214, -8.0078531]; 
  useEffect(() => {
    fetchImages();
    fetchContactInfo();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const fetchContactInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/contacts/all');
      console.log('Contact info response:', response.data); // Ajoutez cette ligne pour afficher la réponse dans la console
      setContactInfo(response.data);
    } catch (error) {
      console.error('Error fetching contact info:', error);
    }
  };
  
  return (
    <div>    <NavigationBar />
    <div style={{ background: 'black', color: 'white', position: 'relative' }}>

      <div style={{ position: 'relative', textAlign: 'right', color: 'white', height: '55vh', overflow: 'hidden' }}>
        <img src={`${process.env.PUBLIC_URL}/contact.jpg`} alt="Marrakech" style={{ width: '100%', height: 'auto' }} />
      </div>
  
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h5>DSAI 2024: 1st International Conference on Data Science & Artificial Intelligence</h5>
        <h2>VENUE & CONTACT</h2> <br />
        <p>DS&AI 2023 will take place at Berkeley Hotel Pratunam, Bangkok, Thailand.</p>
      </div>

      <div className="row">
        {images.slice(0, 8).map((image) => (
          <div key={image.id} className="col-md-3 mb-4">
            <div className="card">
              <img
                src={`data:image/jpeg;base64,${image.image}`}
                className="card-img-top img-thumbnail"
                alt={`Image ${image.id}`}
              />
            </div>
          </div>
        ))}
      </div>

      {contactInfo && contactInfo.length > 0 && (
  <div className="row justify-content-center">
    <div className="col-md-8">
      <div className="card bg-dark text-white">
        <div className="card-body">
          <h2 className="card-title">CONTACT US</h2>
          <br/>
          {contactInfo.map((contact, index) => (
            <div key={index}>
              <p className="card-text">Conference Secretariat</p>
    
              <p className="card-text">
                Email: <span style={{ color: 'yellow' }}>{contact.email}</span></p>

              <p className="card-text">
                Address: <br/>
                <span style={{ color: 'yellow' }}>
                {contact.address.split(',').map((line, i) => (
                  <span key={i}>
                    {line}
                    <br/>
                  </span>
                ))}
                </span>
              </p>
              <div className="card">
              <MapContainer center={position} zoom={12} style={{ height: '300px', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
              </MapContainer>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}



</div>
    </div>
  );
};

export default VenueContact;
