import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getTeachers, deleteTeacher } from '../../services/teacherService';
import ConfirmDelete from '../../components/modals/ConfirmDelete';
import PageHeader from '../../components/common/PageHeader';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
import SearchField from '../../components/common/SearchField';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    setError('');
    try {
      const res = await getTeachers();
      setTeachers(res.data);
    } catch {
      setError('Failed to load teachers.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teachers;
    return teachers.filter((t) =>
      [t.employee_number, t.first_name, t.last_name, t.department, t.email]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [teachers, query]);

  const handleDelete = async () => {
    await deleteTeacher(selectedId);
    setShowModal(false);
    loadTeachers();
  };

  if (loading) return <LoadingState label="Loading teachers…" />;

  return (
    <div>
      <PageHeader
        title="Teachers"
        subtitle="Maintain faculty profiles and department assignments."
        actions={
          <Link to="/teachers/new" className="btn btn-primary">
            Add teacher
          </Link>
        }
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="panel">
        <div className="panel-body">
          <div className="toolbar">
            <SearchField value={query} onChange={setQuery} placeholder="Search teachers…" />
            <span className="text-muted small ms-auto">{filtered.length} shown</span>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title={teachers.length === 0 ? 'No teachers yet' : 'No matches'}
              message={
                teachers.length === 0
                  ? 'Add your first teacher to get started.'
                  : 'Try a different search term.'
              }
              action={
                teachers.length === 0 ? (
                  <Link to="/teachers/new" className="btn btn-primary">
                    Add teacher
                  </Link>
                ) : null
              }
            />
          ) : (
            <div className="table-responsive-wrap">
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
                  {filtered.map((t) => (
                    <tr key={t.id}>
                      <td>{t.employee_number}</td>
                      <td>
                        <strong>
                          {t.first_name} {t.last_name}
                        </strong>
                      </td>
                      <td>{t.department}</td>
                      <td className="text-break">{t.email}</td>
                      <td>
                        <div className="action-group">
                          <Link to={`/teachers/edit/${t.id}`} className="btn btn-sm btn-warning">
                            Edit
                          </Link>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              setSelectedId(t.id);
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
        message="Delete this teacher permanently?"
      />
    </div>
  );
};

export default Teachers;
