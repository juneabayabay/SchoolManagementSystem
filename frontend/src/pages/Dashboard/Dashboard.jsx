import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents } from '../../services/studentService';
import { getTeachers } from '../../services/teacherService';
import { getSubjects } from '../../services/subjectService';
import { getEnrollments } from '../../services/enrollmentService';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import LoadingState from '../../components/common/LoadingState';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ students: 0, teachers: 0, subjects: 0, enrollments: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [students, teachers, subjects, enrollments] = await Promise.all([
          getStudents(),
          getTeachers(),
          getSubjects(),
          getEnrollments(),
        ]);
        setStats({
          students: students.data.length,
          teachers: teachers.data.length,
          subjects: subjects.data.length,
          enrollments: enrollments.data.length,
        });
      } catch {
        setError('Could not load dashboard data. Check that the API is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <LoadingState label="Loading dashboard…" />;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back${user?.username ? `, ${user.username}` : ''}. Here’s an overview of your school records.`}
      />

      {error && <div className="alert alert-warning">{error}</div>}

      <div className="row g-3 g-lg-4 mb-4">
        <div className="col-6 col-lg-3">
          <StatCard label="Students" value={stats.students} meta="Registered learners" tint="var(--brand-soft)" delay={0} />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard label="Teachers" value={stats.teachers} meta="Faculty members" tint="var(--accent-soft)" delay={60} />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard label="Subjects" value={stats.subjects} meta="Course offerings" tint="var(--success-soft)" delay={120} />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard label="Enrollments" value={stats.enrollments} meta="Active enrollments" tint="var(--warning-soft)" delay={180} />
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <strong>Quick actions</strong>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <div className="col-md-6 col-xl-3">
              <Link to="/students/new" className="quick-link">
                <span className="ql-icon">+</span>
                <div>
                  <strong>Add student</strong>
                  <div className="text-muted small">Register a new learner</div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-xl-3">
              <Link to="/teachers/new" className="quick-link">
                <span className="ql-icon">+</span>
                <div>
                  <strong>Add teacher</strong>
                  <div className="text-muted small">Create a faculty record</div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-xl-3">
              <Link to="/subjects/new" className="quick-link">
                <span className="ql-icon">+</span>
                <div>
                  <strong>Add subject</strong>
                  <div className="text-muted small">Define a course offering</div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-xl-3">
              <Link to="/enrollments" className="quick-link">
                <span className="ql-icon">→</span>
                <div>
                  <strong>Enroll student</strong>
                  <div className="text-muted small">Assign subjects by term</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
