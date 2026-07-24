import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudent, createStudent, updateStudent } from '../../services/studentService';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    student_number: '', first_name: '', last_name: '', gender: 'M',
    email: '', birth_date: '', course: '', year_level: 1,
  });

  useEffect(() => {
    if (id) {
      getStudent(id).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) await updateStudent(id, form);
    else await createStudent(form);
    navigate('/students');
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Student</h2>
      <form onSubmit={handleSubmit}>
        {['student_number', 'first_name', 'last_name', 'email', 'birth_date', 'course'].map(f => (
          <div className="mb-3" key={f}>
            <label className="form-label">{f.replace('_',' ').toUpperCase()}</label>
            <input
              name={f}
              type={f === 'birth_date' ? 'date' : 'text'}
              value={form[f]}
              onChange={handleChange}
              className="form-control"
              required={f !== 'course'}
            />
          </div>
        ))}
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} className="form-select">
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Year Level</label>
          <input name="year_level" type="number" value={form.year_level} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-success">Save</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/students')}>Cancel</button>
      </form>
    </div>
  );
};

export default StudentForm;