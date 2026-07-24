import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getSubjects, deleteSubject } from '../../services/subjectService';
import ConfirmDelete from '../../components/modals/ConfirmDelete';
import PageHeader from '../../components/common/PageHeader';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
import SearchField from '../../components/common/SearchField';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    setError('');
    try {
      const res = await getSubjects();
      setSubjects(res.data);
    } catch {
      setError('Failed to load subjects.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return subjects;
    return subjects.filter((s) =>
      [s.subject_code, s.subject_name, s.teacher_name, s.units]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [subjects, query]);

  const handleDelete = async () => {
    await deleteSubject(selectedId);
    setShowModal(false);
    loadSubjects();
  };

  if (loading) return <LoadingState label="Loading subjects…" />;

  return (
    <div>
      <PageHeader
        title="Subjects"
        subtitle="Define course codes, units, and assigned teachers."
        actions={
          <Link to="/subjects/new" className="btn btn-primary">
            Add subject
          </Link>
        }
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="panel">
        <div className="panel-body">
          <div className="toolbar">
            <SearchField value={query} onChange={setQuery} placeholder="Search subjects…" />
            <span className="text-muted small ms-auto">{filtered.length} shown</span>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title={subjects.length === 0 ? 'No subjects yet' : 'No matches'}
              message={
                subjects.length === 0
                  ? 'Add your first subject to get started.'
                  : 'Try a different search term.'
              }
              action={
                subjects.length === 0 ? (
                  <Link to="/subjects/new" className="btn btn-primary">
                    Add subject
                  </Link>
                ) : null
              }
            />
          ) : (
            <div className="table-responsive-wrap">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Units</th>
                    <th>Teacher</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <strong>{s.subject_code}</strong>
                      </td>
                      <td>{s.subject_name}</td>
                      <td>{s.units}</td>
                      <td>{s.teacher_name || 'Unassigned'}</td>
                      <td>
                        <div className="action-group">
                          <Link to={`/subjects/edit/${s.id}`} className="btn btn-sm btn-warning">
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
        message="Delete this subject permanently?"
      />
    </div>
  );
};

export default Subjects;
