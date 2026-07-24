import React, { useState, useEffect, useMemo } from 'react';
import { getEnrollments, createEnrollment, deleteEnrollment } from '../../services/enrollmentService';
import { getStudents } from '../../services/studentService';
import { getSubjects } from '../../services/subjectService';
import ConfirmDelete from '../../components/modals/ConfirmDelete';
import PageHeader from '../../components/common/PageHeader';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
import SearchField from '../../components/common/SearchField';

const emptyForm = {
  student: '',
  subject: '',
  semester: '1st',
  school_year: '2025-2026',
};

const Enrollment = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setError('');
    try {
      const [e, s, sub] = await Promise.all([getEnrollments(), getStudents(), getSubjects()]);
      setEnrollments(e.data);
      setStudents(s.data);
      setSubjects(sub.data);
    } catch {
      setError('Failed to load enrollment data.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return enrollments;
    return enrollments.filter((e) => {
      const studentName = `${e.student_detail?.first_name || ''} ${e.student_detail?.last_name || ''}`;
      const subjectName = e.subject_detail?.subject_name || '';
      return [studentName, subjectName, e.semester, e.school_year]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [enrollments, query]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await createEnrollment(form);
      setForm(emptyForm);
      await loadData();
    } catch (err) {
      setError(err.response?.data ? JSON.stringify(err.response.data) : 'Enrollment failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    await deleteEnrollment(selectedId);
    setShowModal(false);
    loadData();
  };

  if (loading) return <LoadingState label="Loading enrollments…" />;

  return (
    <div>
      <PageHeader
        title="Enrollments"
        subtitle="Assign students to subjects by semester and school year."
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="panel mb-4">
        <div className="panel-header">
          <strong>New enrollment</strong>
        </div>
        <div className="panel-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6 col-xl-3">
              <label className="form-label">Student</label>
              <select name="student" value={form.student} onChange={handleChange} className="form-select" required>
                <option value="">Select student</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.first_name} {s.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 col-xl-3">
              <label className="form-label">Subject</label>
              <select name="subject" value={form.subject} onChange={handleChange} className="form-select" required>
                <option value="">Select subject</option>
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.subject_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-6 col-xl-2">
              <label className="form-label">Semester</label>
              <select name="semester" value={form.semester} onChange={handleChange} className="form-select">
                <option value="1st">First</option>
                <option value="2nd">Second</option>
                <option value="Summer">Summer</option>
              </select>
            </div>
            <div className="col-sm-6 col-xl-2">
              <label className="form-label">School year</label>
              <input name="school_year" value={form.school_year} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-xl-2 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
                {submitting ? 'Saving…' : 'Enroll'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="panel">
        <div className="panel-body">
          <div className="toolbar">
            <SearchField value={query} onChange={setQuery} placeholder="Search enrollments…" />
            <span className="text-muted small ms-auto">{filtered.length} shown</span>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title={enrollments.length === 0 ? 'No enrollments yet' : 'No matches'}
              message={
                enrollments.length === 0
                  ? 'Use the form above to enroll a student in a subject.'
                  : 'Try a different search term.'
              }
            />
          ) : (
            <div className="table-responsive-wrap">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Semester</th>
                    <th>School year</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e) => (
                    <tr key={e.id}>
                      <td>
                        <strong>
                          {e.student_detail?.first_name} {e.student_detail?.last_name}
                        </strong>
                      </td>
                      <td>{e.subject_detail?.subject_name}</td>
                      <td>{e.semester}</td>
                      <td>{e.school_year}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            setSelectedId(e.id);
                            setShowModal(true);
                          }}
                        >
                          Remove
                        </button>
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
        message="Remove this enrollment?"
      />
    </div>
  );
};

export default Enrollment;
