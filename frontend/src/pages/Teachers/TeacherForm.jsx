import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeacher, createTeacher, updateTeacher } from '../../services/teacherService';
import PageHeader from '../../components/common/PageHeader';
import LoadingState from '../../components/common/LoadingState';

const emptyForm = {
  employee_number: '',
  first_name: '',
  last_name: '',
  email: '',
  department: '',
};

const TeacherForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(!!id);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getTeacher(id)
      .then((res) => setForm({ ...emptyForm, ...res.data }))
      .catch(() => setError('Could not load teacher.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      if (id) await updateTeacher(id, form);
      else await createTeacher(form);
      navigate('/teachers');
    } catch (err) {
      setError(err.response?.data ? JSON.stringify(err.response.data) : 'Save failed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingState label="Loading teacher…" />;

  return (
    <div>
      <PageHeader
        title={id ? 'Edit teacher' : 'Add teacher'}
        subtitle="Capture faculty identity and department information."
      />

      <div className="panel form-panel">
        <div className="panel-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Employee number</label>
                <input name="employee_number" value={form.employee_number} onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">First name</label>
                <input name="first_name" value={form.first_name} onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last name</label>
                <input name="last_name" value={form.last_name} onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-12">
                <label className="form-label">Department</label>
                <input name="department" value={form.department} onChange={handleChange} className="form-control" required />
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <button type="submit" className="btn btn-success" disabled={submitting}>
                {submitting ? 'Saving…' : 'Save teacher'}
              </button>
              <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/teachers')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherForm;
