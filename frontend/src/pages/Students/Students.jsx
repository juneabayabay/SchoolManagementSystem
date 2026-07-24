import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, deleteStudent } from '../../services/studentService';
import ConfirmDelete from '../../components/modals/ConfirmDelete';
import PageHeader from '../../components/common/PageHeader';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
import SearchField from '../../components/common/SearchField';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setError('');
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch {
      setError('Failed to load students.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) =>
      [s.student_number, s.first_name, s.last_name, s.course, s.email]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [students, query]);

  const handleDelete = async () => {
    await deleteStudent(selectedId);
    setShowModal(false);
    loadStudents();
  };

  if (loading) return <LoadingState label="Loading students…" />;

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle="Manage learner records, courses, and year levels."
        actions={
          <Link to="/students/new" className="btn btn-primary">
            Add student
          </Link>
        }
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="panel">
        <div className="panel-body">
          <div className="toolbar">
            <SearchField value={query} onChange={setQuery} placeholder="Search students…" />
            <span className="text-muted small ms-auto">{filtered.length} shown</span>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title={students.length === 0 ? 'No students yet' : 'No matches'}
              message={
                students.length === 0
                  ? 'Add your first student to get started.'
                  : 'Try a different search term.'
              }
              action={
                students.length === 0 ? (
                  <Link to="/students/new" className="btn btn-primary">
                    Add student
                  </Link>
                ) : null
              }
            />
          ) : (
            <div className="table-responsive-wrap">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id}>
                      <td>{s.student_number}</td>
                      <td>
                        <strong>
                          {s.first_name} {s.last_name}
                        </strong>
                      </td>
                      <td>{s.course || '—'}</td>
                      <td>{s.year_level}</td>
                      <td>
                        <div className="action-group">
                          <Link to={`/students/edit/${s.id}`} className="btn btn-sm btn-warning">
                            Edit
                          </Link>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              setSelectedId(s.id);
                              setShowModal(true);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
