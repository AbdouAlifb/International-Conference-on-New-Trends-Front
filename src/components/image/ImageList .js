import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Sidebar from '../Sidebar';

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({
    date: '',
    file: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleFileChange = (event) => {
    setNewImage({
      ...newImage,
      file: event.target.files[0],
    });
  };

  const handleDateChange = (event) => {
    setNewImage({
      ...newImage,
      date: event.target.value,
    });
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('file', newImage.file);
    formData.append('date', newImage.date);

    try {
      await axios.post('http://localhost:8081/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchImages();
      setNewImage({
        date: '',
        file: null,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/images/${id}`);
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleUpdateClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleImageUpdate = async () => {
    const formData = new FormData();
    formData.append('file', newImage.file);
    formData.append('date', newImage.date);
  
    try {
      await axios.put(`http://localhost:8081/api/images/${selectedImage.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchImages();
      setShowModal(false);
      // Assurez-vous de réinitialiser l'image sélectionnée après la mise à jour
      setSelectedImage(null);
      // Vous pouvez également réinitialiser le formulaire
      setNewImage({
        date: '',
        file: null,
      });
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  return (
    <div  className="d-flex">
    <Sidebar />
    <div className="container">
      <h2 className="mt-4 mb-4">Image List</h2>

      {/* Formulaire pour ajouter une nouvelle image */}
      <div className="mb-4">
        <label>Date: </label>
        <input type="text" className="form-control" value={newImage.date} onChange={handleDateChange} />
        <br />
        <label>Image File: </label>
        <input type="file" className="form-control" onChange={handleFileChange} />
        <br />
        <button className="btn btn-primary" onClick={handleImageUpload}>
          Add Image
        </button>
      </div>

      {/* Liste des images avec Bootstrap */}
      <div className="row">
        {images.map((image) => (
          <div key={image.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={`data:image/jpeg;base64,${image.image}`}
                className="card-img-top"
                alt={`Image ${image.id}`}
              />
              <div className="card-body">
                <p className="card-text">Date: {image.date}</p>
                <button className="btn btn-danger" onClick={() => handleDeleteImage(image.id)}>
                  Delete
                </button>
                <button className="btn btn-primary" onClick={() => handleUpdateClick(image)}>
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de mise à jour */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Date: </label>
          <input type="text" className="form-control" value={newImage.date} onChange={handleDateChange} />
          <br />
          <label>Image File: </label>
          <input type="file" className="form-control" onChange={handleFileChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleImageUpdate}>
            Update Image
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
};

export default ImageList;
