import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubject, createSubject, updateSubject } from '../../services/subjectService';
import { getTeachers } from '../../services/teacherService';
import PageHeader from '../../components/common/PageHeader';
import LoadingState from '../../components/common/LoadingState';

const emptyForm = {
  subject_code: '',
  subject_name: '',
  units: 3,
  teacher: '',
};

const SubjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const teachersRes = await getTeachers();
        setTeachers(teachersRes.data);
        if (id) {
          const subjectRes = await getSubject(id);
          setForm({
            ...emptyForm,
            ...subjectRes.data,
            teacher: subjectRes.data.teacher ?? '',
          });
        }
      } catch {
        setError('Could not load form data.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const payload = {
        ...form,
        units: Number(form.units),
        teacher: form.teacher || null,
      };
      if (id) await updateSubject(id, payload);
      else await createSubject(payload);
      navigate('/subjects');
    } catch (err) {
      setError(err.response?.data ? JSON.stringify(err.response.data) : 'Save failed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingState label="Loading subject…" />;

  return (
    <div>
      <PageHeader
        title={id ? 'Edit subject' : 'Add subject'}
        subtitle="Set the course identity and optionally assign a teacher."
      />

      <div className="panel form-panel">
        <div className="panel-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Subject code</label>
                <input name="subject_code" value={form.subject_code} onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-md-8">
                <label className="form-label">Subject name</label>
                <input name="subject_name" value={form.subject_name} onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Units</label>
                <input name="units" type="number" min="1" value={form.units} onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-md-8">
                <label className="form-label">Teacher</label>
                <select name="teacher" value={form.teacher} onChange={handleChange} className="form-select">
                  <option value="">Unassigned</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.first_name} {t.last_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <button type="submit" className="btn btn-success" disabled={submitting}>
                {submitting ? 'Saving…' : 'Save subject'}
              </button>
              <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/subjects')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubjectForm;
