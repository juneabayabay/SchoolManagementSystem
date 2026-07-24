import React, { useState, useEffect } from 'react';
import { getStudents } from '../../services/studentService';
import { getTeachers } from '../../services/teacherService';
import { getSubjects } from '../../services/subjectService';
import { getEnrollments } from '../../services/enrollmentService';

const Dashboard = () => {
  const [stats, setStats] = useState({ students: 0, teachers: 0, subjects: 0, enrollments: 0 });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [students, teachers, subjects, enrollments] = await Promise.all([
          getStudents(),
          getTeachers(),
          getSubjects(),
          getEnrollments()
        ]);
        setStats({
          students: students.data.length,
          teachers: teachers.data.length,
          subjects: subjects.data.length,
          enrollments: enrollments.data.length,
        });
      } catch (error) {
        console.error('Failed to load dashboard stats', error);
      }
    };
    fetchAll();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <div className="row g-4">
        <div className="col-md-3 col-sm-6">
          <div className="card p-3 text-center">
            <h5>Students</h5>
            <h2>{stats.students}</h2>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card p-3 text-center">
            <h5>Teachers</h5>
            <h2>{stats.teachers}</h2>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card p-3 text-center">
            <h5>Subjects</h5>
            <h2>{stats.subjects}</h2>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card p-3 text-center">
            <h5>Enrollments</h5>
            <h2>{stats.enrollments}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;