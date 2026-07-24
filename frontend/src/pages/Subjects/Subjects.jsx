import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubjects, deleteSubject } from '../../services/subjectService';
import ConfirmDelete from '../../components/modals/ConfirmDelete';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => { loadSubjects(); }, []);

  const loadSubjects = async () => {
    try {
      const res = await getSubjects();
      setSubjects(res.data);
    } catch (err) { console.error(err) } finally { setLoading(false) }
  };

  const handleDelete = async () => {
    await deleteSubject(selectedId);
    setShowModal(false);
    loadSubjects();
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Subjects</h2>
        <Link to="/subjects/new" className="btn btn-primary">+ Add Subject</Link>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table table-hover">
            <thead><tr><th>Code</th><th>Name</th><th>Units</th><th>Teacher</th><th>Actions</th></tr></thead>
            <tbody>
              {subjects.map(s => (
                <tr key={s.id}>
                  <td>{s.subject_code}</td>
                  <td>{s.subject_name}</td>
                  <td>{s.units}</td>
                  <td>{s.teacher_name || 'N/A'}</td>
                  <td>
                    <Link to={`/subjects/edit/${s.id}`} className="btn btn-sm btn-warning me-1">Edit</Link>
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
      <ConfirmDelete show={showModal} onClose={() => setShowModal(false)} onConfirm={handleDelete} />
    </div>
  );
};

export default Subjects;