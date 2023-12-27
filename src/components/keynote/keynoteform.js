import React, { useState } from 'react';
import axios from 'axios';

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

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Keynote Form</h2>

      <label>Title:
        <input type="text" className="form-control" value={title} onChange={handleTitleChange} />
      </label>
      <br />
      <label>Description:
        <input type="text" className="form-control" value={description} onChange={handleDescriptionChange} />
      </label>
      <br />
      <label>Content:
        <textarea className="form-control" value={content} onChange={handleContentChange} />
      </label>
      <br />
      <br />
      <label>Bio:
        <textarea className="form-control" value={bio} onChange={handleBioChange} />
      </label>
      <br />
      <label>File:
        <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
      </label>
      <br /><br />
      <button className="btn btn-primary" onClick={handleKeynoteUpload}>
        Add Keynote
      </button>
    </div>
  );
};

export default KeynoteForm;
