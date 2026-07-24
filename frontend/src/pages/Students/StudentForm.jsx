import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudent, createStudent, updateStudent } from '../../services/studentService';
import PageHeader from '../../components/common/PageHeader';
import LoadingState from '../../components/common/LoadingState';

const emptyForm = {
  student_number: '',
  first_name: '',
  last_name: '',
  gender: 'M',
  email: '',
  birth_date: '',
  course: '',
  year_level: 1,
};

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(!!id);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getStudent(id)
      .then((res) =>
        setForm({
          ...emptyForm,
          ...res.data,
          birth_date: res.data.birth_date || '',
        })
      )
      .catch(() => setError('Could not load student.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const payload = {
        ...form,
        year_level: Number(form.year_level),
        birth_date: form.birth_date || null,
      };
      if (id) await updateStudent(id, payload);
      else await createStudent(payload);
      navigate('/students');
    } catch (err) {
      setError(err.response?.data ? JSON.stringify(err.response.data) : 'Save failed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingState label="Loading student…" />;

  return (
    <div>
      <PageHeader
        title={id ? 'Edit student' : 'Add student'}
        subtitle="Enter learner details. Fields marked required must be completed."
      />

      <div className="panel form-panel">
        <div className="panel-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Student number</label>
                <input name="student_number" value={form.student_number} onChange={handleChange} className="form-control" required />
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
              <div className="col-md-4">
                <label className="form-label">Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange} className="form-select">
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Birth date</label>
                <input name="birth_date" type="date" value={form.birth_date} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Year level</label>
                <input name="year_level" type="number" min="1" value={form.year_level} onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-12">
                <label className="form-label">Course</label>
                <input name="course" value={form.course} onChange={handleChange} className="form-control" />
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <button type="submit" className="btn btn-success" disabled={submitting}>
                {submitting ? 'Saving…' : 'Save student'}
              </button>
              <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/students')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
