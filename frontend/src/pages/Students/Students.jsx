import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, deleteStudent } from '../../services/studentService';
import ConfirmDelete from '../../components/modals/ConfirmDelete';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => { loadStudents(); }, []);

  const loadStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) { console.error(err) } finally { setLoading(false) }
  };

  const handleDelete = async () => {
    await deleteStudent(selectedId);
    setShowModal(false);
    loadStudents();
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Students</h2>
        <Link to="/students/new" className="btn btn-primary">+ Add Student</Link>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table table-hover">
            <thead><tr><th>No.</th><th>Name</th><th>Course</th><th>Year</th><th>Actions</th></tr></thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id}>
                  <td>{s.student_number}</td>
                  <td>{s.first_name} {s.last_name}</td>
                  <td>{s.course}</td>
                  <td>{s.year_level}</td>
                  <td>
                    <Link to={`/students/edit/${s.id}`} className="btn btn-sm btn-warning me-1">Edit</Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => { setSelectedId(s.id); setShowModal(true); }}
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmDelete
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        message="Delete this student permanently?"
      />
    </div>
  );
};

export default Students;