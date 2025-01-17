import React, { useState } from 'react';
import axiosInstance from '../api/apiClient';
import './SearchStudent.css';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaArrowLeft } from 'react-icons/fa'; // Importa los íconos de react-icons

interface Course {
  id: number;
  name: string;
  rol: string;
  link: string;
  code: string;
  aim: string;
  contents: string;
}

const StudentCourses: React.FC = () => {
  const [dni, setDni] = useState('');
  const [studentName, setStudentName] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStudentName('');
    setCourses([]);

    try {
      // Llamada a la API para obtener los detalles del estudiante y sus cursos
      const response = await axiosInstance.get(`/student/student-details/${dni}`);
      const { student, courses } = response.data;

      // Actualizar el nombre del estudiante y los cursos
      setStudentName(student.name);
      setCourses(courses);
    } catch (error: any) {
      console.error('Error al buscar al estudiante o los cursos:', error);
      setError(
        'No se encontró al estudiante o no se pudieron cargar los cursos. Por favor, verifica el DNI ingresado.'
      );
    }
  };

  return (
    <div className="student-courses">
      <h1>Buscar Cursos por DNI</h1>
      <button className="login-button" onClick={() => navigate('/login')}>
        <FaArrowLeft /> Ir al Login {/* Icono de flecha atrás */}
      </button>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Ingrese el DNI del estudiante"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <button type="submit">
          <FaSearch /> Buscar {/* Icono de búsqueda */}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {studentName && (
        <div className="student-info">
          <h2>Estudiante: {studentName}</h2>
        </div>
      )}

      {courses.length > 0 && (
        <div className="courses-list">
          <h3>Cursos del Estudiante:</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Enlace</th>
                <th>Código</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.rol}</td>
                  <td>
                    <a href={course.link} target="_blank" rel="noopener noreferrer">
                      Ver Enlace
                    </a>
                  </td>
                  <td>{course.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
