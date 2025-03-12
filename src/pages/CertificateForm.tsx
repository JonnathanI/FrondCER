// src/components/CertificateForm.tsx
import React, { useState } from 'react';
import axiosInstance from '../api/apiClient';

const CertificateForm: React.FC = () => {
  const [studentName, setStudentName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [hours, setHours] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(
        `/api/certificado/generate/${studentName}/${courseName}/${hours}`,
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'certificate.pdf');
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || 'Error generating certificate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ // Estilos modificados para ajustar el tamaño
      maxWidth: '900px', // Ancho máximo del recuadro
      width: '80%', // Ancho relativo del recuadro
      padding: '30px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '25px',
        color: '#333',
        fontWeight: '600',
      }}>
        Generar Certificado
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="studentName" style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: '500',
            color: '#555',
          }}>
            Nombre del Estudiante:
          </label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="courseName" style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: '500',
            color: '#555',
          }}>
            Nombre del Curso:
          </label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1, marginRight: '10px' }}>
            <label htmlFor="hours" style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: '500',
              color: '#555',
            }}>
              Horas:
            </label>
            <input
              type="text"
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button type="submit" disabled={loading} style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
            whiteSpace: 'nowrap',
          }}>
            {loading ? 'Generando...' : 'Generar Certificado'}
          </button>
        </div>
        {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
      </form>
    </div>
  );
};

export default CertificateForm;