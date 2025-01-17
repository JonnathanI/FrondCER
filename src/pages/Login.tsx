// src/pages/Login.tsx
import React, { useState } from 'react';
import axiosInstance from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importa el archivo CSS

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', { username, password });
      localStorage.setItem('jwt', response.data.jwt);
      navigate('/dashboard'); // Redirige al dashboard después de login
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="title">Iniciar Sesión</h1>
        <form onSubmit={handleLogin} className="form">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
