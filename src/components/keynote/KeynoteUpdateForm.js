import React, { useState, useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const KeynoteUpdateForm = ({ onKeynoteUpdated, existingKeynote }) => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [bio, setBio] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Charger les anciennes valeurs lorsque existingKeynote est mis à jour
    if (existingKeynote) {
      setTitle(existingKeynote.title || '');
      setDescription(existingKeynote.description || '');
      setContent(existingKeynote.content || '');
      setBio(existingKeynote.bio || '');
      // Si vous souhaitez également afficher l'ancien fichier, vous pouvez ajuster le code ici
    }
  }, [existingKeynote]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const loadExistingValues = () => {
    // Charger les anciennes valeurs depuis la base de données (si nécessaire)
    // Cela pourrait être une requête à votre API
    axios.get(`http://localhost:8081/api/keynotes/${id}`)
      .then(response => {
        const existingKeynoteData = response.data;
        setTitle(existingKeynoteData.title);
        setDescription(existingKeynoteData.description);
        setContent(existingKeynoteData.content);
        setBio(existingKeynoteData.bio);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des anciennes valeurs :', error);
      });
  };

  const handleKeynoteUpdate = async () => {
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
  

  // Chargez les anciennes valeurs lorsque le composant est monté
  useEffect(() => {
    loadExistingValues();
  }, []);

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Update Keynote</h2>

      <label>
        Title:
        <input type="text" className="form-control" value={title} onChange={(e) => handleInputChange(e, setTitle)} />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => handleInputChange(e, setDescription)}
        />
      </label>
      <br />
      <label>
        Content:
        <textarea className="form-control" value={content} onChange={(e) => handleInputChange(e, setContent)} />
      </label>
      <br />
      <br />
      <label>
        Bio:
        <textarea className="form-control" value={bio} onChange={(e) => handleInputChange(e, setBio)} />
      </label>
      <br />
      <label>
        File:
        <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
      </label>
      <br />
      <br />
      <button className="btn btn-primary" onClick={handleKeynoteUpdate}>
        Update Keynote
      </button>
    </div>
  );
};

export default KeynoteUpdateForm;
