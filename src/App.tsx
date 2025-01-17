import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Disertadores from './pages/Disertadores';
import Certificados from './pages/Certificados';
import StudentCourses from './pages/SearchStudent';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/buscar" element={<StudentCourses />} />
        <Route path="/disertadores" element={<Disertadores />} />
        <Route path="/certificados" element={<Certificados />} />
        <Route path="/" element={<Navigate to="/buscar" />} /> {/* Redirige a login */}
      </Routes>
    </Router>
  );
};

export default App;
