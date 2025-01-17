// src/pages/Students.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/apiClient';
import './Students.css'; // Importando el archivo CSS

interface Student {
  id: number;
  name: string;
  dni: string;
}

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get('/student');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Estudiantes</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <span>{student.name}</span> ({student.dni})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
