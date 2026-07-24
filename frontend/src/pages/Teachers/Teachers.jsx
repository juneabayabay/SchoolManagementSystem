import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTeachers, deleteTeacher } from '../../services/teacherService';
import ConfirmDelete from '../../components/modals/ConfirmDelete';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => { loadTeachers(); }, []);

  const loadTeachers = async () => {
    try {
      const res = await getTeachers();
      setTeachers(res.data);
    } catch (err) { console.error(err) } finally { setLoading(false) }
  };

  const handleDelete = async () => {
    await deleteTeacher(selectedId);
    setShowModal(false);
    loadTeachers();
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Teachers</h2>
        <Link to="/teachers/new" className="btn btn-primary">+ Add Teacher</Link>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Employee #</th>
                <th>Name</th>
                <th>Department</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(t => (
                <tr key={t.id}>
                  <td>{t.employee_number}</td>
                  <td>{t.first_name} {t.last_name}</td>
                  <td>{t.department}</td>
                  <td>{t.email}</td>
                  <td>
                    <Link to={`/teachers/edit/${t.id}`} className="btn btn-sm btn-warning me-1">Edit</Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => { setSelectedId(t.id); setShowModal(true); }}
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
        message="Delete this teacher permanently?"
      />
    </div>
  );
};

export default Teachers;