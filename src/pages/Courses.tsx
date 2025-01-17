// src/pages/Courses.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/apiClient';

interface Course {
  id: number;
  name: string;
  rol: string;
  link: string;
  code: string;
  aim: string;
  contents: string;
  students_id: number;
  trainer_id: number;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/course');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Cursos</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre del Curso</th>
            <th>Rol</th>
            <th>Enlace</th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.rol}</td>
              <td><a href={course.link} target="_blank" rel="noopener noreferrer">Ver Enlace</a></td>
              <td>{course.code}</td>
              <td>{course.aim}</td>
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

export default Courses;
