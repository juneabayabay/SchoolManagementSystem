import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingState from '../components/common/LoadingState';

import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Students from '../pages/Students/Students';
import StudentForm from '../pages/Students/StudentForm';
import Teachers from '../pages/Teachers/Teachers';
import TeacherForm from '../pages/Teachers/TeacherForm';
import Subjects from '../pages/Subjects/Subjects';
import SubjectForm from '../pages/Subjects/SubjectForm';
import Enrollment from '../pages/Enrollment/Enrollment';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingState label="Checking session…" />;
  return user ? children : <Navigate to="/login" replace />;
};

const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingState label="Checking session…" />;
  return user ? <Navigate to="/" replace /> : children;
};

const AppRoutes = () => (
  <Routes>
    <Route
      element={
        <PublicOnlyRoute>
          <AuthLayout />
        </PublicOnlyRoute>
      }
    >
      <Route path="/login" element={<Login />} />
    </Route>

    <Route
      element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/students/new" element={<StudentForm />} />
      <Route path="/students/edit/:id" element={<StudentForm />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/teachers/new" element={<TeacherForm />} />
      <Route path="/teachers/edit/:id" element={<TeacherForm />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/subjects/new" element={<SubjectForm />} />
      <Route path="/subjects/edit/:id" element={<SubjectForm />} />
      <Route path="/enrollments" element={<Enrollment />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
