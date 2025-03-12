// src/pages/Dashboard.tsx
import React, { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={dashboardStyle}>
      <h1 style={headingStyle}>
        Bienvenido al Panel de Control
      </h1>
      <div style={buttonContainerStyle}>
        <button onClick={() => navigate('/students')} style={buttonStyle}>
          Estudiantes
        </button>
        <button onClick={() => navigate('/courses')} style={buttonStyle}>
          Cursos
        </button>
        <button onClick={() => navigate('/disertadores')} style={buttonStyle}>
          Disertadores
        </button>
        <button onClick={() => navigate('/certificados')} style={buttonStyle}>
          Certificados
        </button>
        <button onClick={() => navigate('/CertificateForm')} style={buttonStyle}>
          Generar Certificados
        </button>
      </div>
    </div>
  );
};

// Estilos del Dashboard
const dashboardStyle: CSSProperties = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f4f6f8',
  padding: '20px',
  boxSizing: 'border-box',
};

// Estilos del encabezado
const headingStyle: CSSProperties = {
  textAlign: 'center',
  marginBottom: '40px',
  color: '#333',
  fontWeight: '600',
};

// Estilos del contenedor de botones
const buttonContainerStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px',
};

// Estilos de los botones
const buttonStyle: CSSProperties = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '500',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.2s ease-in-out',
};

export default Dashboard;