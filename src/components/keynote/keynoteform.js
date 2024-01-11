import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar'; 

const KeynoteForm = ({ onKeynoteAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [bio, setBio] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleKeynoteUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('bio', bio);
    formData.append('content', content);

    try {
      await axios.post('http://localhost:8081/api/keynotes/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Reset the form fields after a successful upload
      setTitle('');
      setDescription('');
      setContent('');
      setBio('');
      setFile(null);

      if (onKeynoteAdded) {
        onKeynoteAdded();
      }
    } catch (error) {
      console.error('Error while saving keynote:', error);
    }
  };
// ...

return (
  <div className="d-flex">
    <Sidebar />
    <div className="container">
      <h2 className="mt-4 mb-4">Keynote Form</h2>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title:</label>
        <input type="text" className="form-control" id="title" value={title} onChange={handleTitleChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <input type="text" className="form-control" id="description" value={description} onChange={handleDescriptionChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="content" className="form-label">Content:</label>
        <textarea className="form-control" id="content" value={content} onChange={handleContentChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="bio" className="form-label">Bio:</label>
        <textarea className="form-control" id="bio" value={bio} onChange={handleBioChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="file" className="form-label">File:</label>
        <input type="file" accept="image/*" className="form-control" id="file" onChange={handleFileChange} />
      </div>

      <button className="btn btn-primary" onClick={handleKeynoteUpload}>
        Add Keynote
      </button>
    </div>
  </div>
);

};

export default KeynoteForm;
