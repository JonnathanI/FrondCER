// src/pages/Disertadores.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/apiClient';

interface Trainer {
  id: number;
  name: string;
  area: string;
}

const Disertadores: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axiosInstance.get('/trainer');
        setTrainers(response.data);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };
    fetchTrainers();
  }, []);

  return (
    <div>
      <h1>Disertadores</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre del Disertador</th>
            <th>Área</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer.id}>
              <td>{trainer.name}</td>
              <td>{trainer.area}</td>
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

export default Disertadores;
