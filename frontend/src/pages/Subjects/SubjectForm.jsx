import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubject, createSubject, updateSubject } from '../../services/subjectService';
import { getTeachers } from '../../services/teacherService';

const SubjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    subject_code: '', subject_name: '', units: 3, teacher: ''
  });

  useEffect(() => {
    getTeachers().then(res => setTeachers(res.data));
    if (id) {
      getSubject(id).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) await updateSubject(id, form);
    else await createSubject(form);
    navigate('/subjects');
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Subject</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Subject Code</label>
          <input name="subject_code" value={form.subject_code} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Subject Name</label>
          <input name="subject_name" value={form.subject_name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Units</label>
          <input name="units" type="number" value={form.units} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Teacher</label>
          <select name="teacher" value={form.teacher} onChange={handleChange} className="form-select">
            <option value="">Select Teacher</option>
            {teachers.map(t => <option key={t.id} value={t.id}>{t.first_name} {t.last_name}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-success">Save</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/subjects')}>Cancel</button>
      </form>
    </div>
  );
};

export default SubjectForm;