import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../Navbar';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/login', {
        email,
        password,
      });
      if (response.data === 'Login successful!') {
        // Redirect to AdminDashboard if login is successful
        setMessage('Connexion réussie.');
        navigate('/admin'); // Make sure your routes are configured correctly
      } else {
        // Alert if credentials are incorrect
        setMessage('Le mot de passe ou l\'email est incorrect.');
      }
    } catch (error) {
      // Handle request errors
      console.error('Erreur lors de la requête:', error);
      setMessage('Une erreur est survenue lors de la connexion.');
    }
  };

  return (
    <div>

    <NavigationBar />
    <div
      className="container-fluid p-0"
      style={{
        backgroundImage: 'url(/login1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="container">
        <h2 className="text-center mb-4 text-white">Connexion</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Mot de passe:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Se connecter</button>
          </div>
          {message && (
            <div className={message === 'Connexion réussie.' ? 'text-success mt-3' : 'text-danger mt-3'}>
              {message}
            </div>
          )}
        </form>
      </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
