import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Sidebar from '../Sidebar';

const KeynoteUpdateForm = ({ onKeynoteUpdated, existingKeynote }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [bio, setBio] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (existingKeynote) {
      const { title, description, content, bio } = existingKeynote;
      setTitle(title || '');
      setDescription(description || '');
      setContent(content || '');
      setBio(bio || '');
    } else {
      loadExistingValues();
    }
  }, [existingKeynote]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const loadExistingValues = () => {
    axios
      .get(`http://localhost:8081/api/keynotes/${id}`)
      .then((response) => {
        const existingKeynoteData = response.data;
        setTitle(existingKeynoteData.title);
        setDescription(existingKeynoteData.description);
        setContent(existingKeynoteData.content);
        setBio(existingKeynoteData.bio);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des anciennes valeurs :', error);
      });
  };

  const handleKeynoteUpdate = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('bio', bio);
    formData.append('content', content);

    try {
      await axios.put(`http://localhost:8081/api/keynotes/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Affiche un toast de succès
      toast.success('Keynote updated successfully');

      if (onKeynoteUpdated) {
        onKeynoteUpdated();
      }

      // Rediriger vers la liste des keynotes après la mise à jour
      navigate('/keynoteList');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la keynote :', error);
      // Affiche un toast d'erreur
      toast.error('Error updating keynote');
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-3">
        <h2 className="text-center mb-4">Update Keynote</h2>
        <form onSubmit={handleKeynoteUpdate}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => handleInputChange(e, setTitle)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => handleInputChange(e, setDescription)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content:
            </label>
            <textarea
              className="form-control"
              id="content"
              value={content}
              onChange={(e) => handleInputChange(e, setContent)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bio" className="form-label">
              Bio:
            </label>
            <textarea
              className="form-control"
              id="bio"
              value={bio}
              onChange={(e) => handleInputChange(e, setBio)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              File:
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              id="file"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Keynote
          </button>
        </form>
      </div>
    </div>
  );
};

export default KeynoteUpdateForm;
