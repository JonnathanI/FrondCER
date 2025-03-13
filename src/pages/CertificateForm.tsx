// src/components/CertificateForm.tsx
import React, { useState } from 'react';
import axiosInstance from '../api/apiClient';

interface Course {
  id: number;
  name: string;
  rol: string;
  link: string;
  code: string;
  aim: string;
  contents: string;
}

const CertificateForm: React.FC = () => {
  const [dni, setDni] = useState('');
  const [studentName, setStudentName] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [hours, setHours] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setStudentName('');
    setCourses([]);
    setSelectedCourse(null);

    try {
      const response = await axiosInstance.get(`/student/student-details/${dni}`);
      const { student, courses } = response.data;
      setStudentName(student.name);
      setCourses(courses);
    } catch (err: any) {
      setError(err.message || 'Error al buscar el estudiante.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!selectedCourse) {
      setError('Por favor, selecciona un curso.');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/api/certificado/generate/${studentName}/${selectedCourse.name}/${hours}`,
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${selectedCourse.name}_certificate.pdf`);
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
    <div style={{ maxWidth: '900px', width: '80%', padding: '30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333', fontWeight: '600' }}>Generar Certificado</h2>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="dni" style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#555' }}>DNI del Estudiante:</label>
        <input type="text" id="dni" value={dni} onChange={(e) => setDni(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
        <button type="button" onClick={handleSearch} disabled={loading} style={{ marginTop: '10px', backgroundColor: '#007bff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
          {loading ? 'Buscando...' : 'Buscar Estudiante'}
        </button>
      </div>

      {studentName && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Estudiante: {studentName}</h3>
          {courses.length > 0 && (
            <select value={selectedCourse ? selectedCourse.id : ''} onChange={(e) => setSelectedCourse(courses.find(c => c.id === parseInt(e.target.value)) || null)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}>
              <option value="">Selecciona un curso</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1, marginRight: '10px' }}>
            <label htmlFor="hours" style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#555' }}>Horas:</label>
            <input type="text" id="hours" value={hours} onChange={(e) => setHours(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" disabled={loading || !selectedCourse} style={{ backgroundColor: '#007bff', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', whiteSpace: 'nowrap' }}>
            {loading ? 'Generando...' : 'Generar Certificado'}
          </button>
        </div>
        {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
      </form>
    </div>
  );
};

export default CertificateForm;