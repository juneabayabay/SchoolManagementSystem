import React, { useState, useEffect } from 'react';
import { getEnrollments, createEnrollment, deleteEnrollment } from '../../services/enrollmentService';
import { getStudents } from '../../services/studentService';
import { getSubjects } from '../../services/subjectService';
import ConfirmDelete from '../../components/modals/ConfirmDelete';

const Enrollment = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ student: '', subject: '', semester: '1st', school_year: '2025-2026' });
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [e, s, sub] = await Promise.all([
        getEnrollments(), getStudents(), getSubjects()
      ]);
      setEnrollments(e.data);
      setStudents(s.data);
      setSubjects(sub.data);
    } catch (err) { console.error(err); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEnrollment(form);
    loadData();
    setForm({ student: '', subject: '', semester: '1st', school_year: '2025-2026' });
  };

  const handleDelete = async () => {
    await deleteEnrollment(selectedId);
    setShowModal(false);
    loadData();
  };

  return (
    <div>
      <h2>Enrollments</h2>
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-3">
          <label>Student</label>
          <select name="student" value={form.student} onChange={handleChange} className="form-select" required>
            <option value="">Select</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>)}
          </select>
        </div>
        <div className="col-md-3">
          <label>Subject</label>
          <select name="subject" value={form.subject} onChange={handleChange} className="form-select" required>
            <option value="">Select</option>
            {subjects.map(sub => <option key={sub.id} value={sub.id}>{sub.subject_name}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <label>Semester</label>
          <select name="semester" value={form.semester} onChange={handleChange} className="form-select">
            <option value="1st">First</option><option value="2nd">Second</option><option value="Summer">Summer</option>
          </select>
        </div>
        <div className="col-md-2">
          <label>School Year</label>
          <input name="school_year" value={form.school_year} onChange={handleChange} className="form-control" />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button type="submit" className="btn btn-primary w-100">Enroll</button>
        </div>
      </form>

      <div className="card">
        <div className="card-body">
          <table className="table table-hover">
            <thead><tr><th>Student</th><th>Subject</th><th>Semester</th><th>School Year</th><th>Actions</th></tr></thead>
            <tbody>
              {enrollments.map(e => (
                <tr key={e.id}>
                  <td>{e.student_detail?.first_name} {e.student_detail?.last_name}</td>
                  <td>{e.subject_detail?.subject_name}</td>
                  <td>{e.semester}</td>
                  <td>{e.school_year}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => { setSelectedId(e.id); setShowModal(true); }}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmDelete show={showModal} onClose={() => setShowModal(false)} onConfirm={handleDelete} message="Remove this enrollment?" />
    </div>
  );
};

export default Enrollment;