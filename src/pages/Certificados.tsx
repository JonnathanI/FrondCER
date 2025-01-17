// src/pages/Certificados.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/apiClient';

interface Certificate {
  id: number;
  hours: string;
  date: string;
  course_id: number;
}

const Certificados: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axiosInstance.get('/certificate');
        setCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };
    fetchCertificates();
  }, []);

  return (
    <div>
      <h1>Certificados</h1>
      <table>
        <thead>
          <tr>
            <th>Duración</th>
            <th>Fecha</th>
            <th>Curso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((certificate) => (
            <tr key={certificate.id}>
              <td>{certificate.hours}</td>
              <td>{certificate.date}</td>
              <td>{certificate.course_id}</td>
              <td>
                <button>Ver Detalles</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Certificados;
