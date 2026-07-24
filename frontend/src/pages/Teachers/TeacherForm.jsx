import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeacher, createTeacher, updateTeacher } from '../../services/teacherService';

const TeacherForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    employee_number: '',
    first_name: '',
    last_name: '',
    email: '',
    department: '',
  });

  useEffect(() => {
    if (id) {
      getTeacher(id).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) await updateTeacher(id, form);
    else await createTeacher(form);
    navigate('/teachers');
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Employee Number</label>
          <input name="employee_number" value={form.employee_number} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input name="first_name" value={form.first_name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input name="last_name" value={form.last_name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <input name="department" value={form.department} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success">Save</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/teachers')}>Cancel</button>
      </form>
    </div>
  );
};

export default TeacherForm;