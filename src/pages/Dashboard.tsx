// src/pages/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bienvenido al Panel de Control</h1>
      <div>
        <button onClick={() => navigate('/students')}>Estudiantes</button>
      </div>
      <div>
        <button onClick={() => navigate('/courses')}>Cursos</button>
      </div>
      <div>
        <button onClick={() => navigate('/disertadores')}>Disertadores</button>
      </div>
      <div>
        <button onClick={() => navigate('/certificados')}>Certificados</button>
      </div>
    </div>
  );
};

export default Dashboard;
