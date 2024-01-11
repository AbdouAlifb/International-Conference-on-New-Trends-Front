import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Navbar';

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div>    
    <NavigationBar />
    <div  style={{ background: 'black', color: 'white' }}>
         <div style={{ position: 'relative', textAlign: 'right', color: 'white', height: '55vh', overflow: 'hidden' }}>
                <img src={`${process.env.PUBLIC_URL}/marrakech.jpg`} alt="Marrakech" style={{ width: '100%', height: 'auto' }} />
                {/* <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3em', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}>
                    International Conference
                    </h1>
                    <p style={{ marginTop: '1rem', fontSize: '1.5em' }}>
                        Address : Marrakech
                    </p>
                </div> */}
            </div>
  
    <div className="container mt-4">
        
    <h2 className="text-center   ">DSAI 2023: 1st International Conference on Data Science & Artificial Intelligence
<br/>IMAGE </h2>

      <div className="row">
        {images.map((image) => (
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
    </div>
    </div>
    </div>
  );
};

export default ImageList;
