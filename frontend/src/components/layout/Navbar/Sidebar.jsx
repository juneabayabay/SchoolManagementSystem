import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkStyle = ({ isActive }) => ({
    display: 'block',
    padding: '10px 20px',
    color: isActive ? '#fff' : '#adb5bd',
    backgroundColor: isActive ? '#0d6efd' : 'transparent',
    textDecoration: 'none',
    borderRadius: '8px',
    marginBottom: '5px',
  });

  return (
    <div
      className="bg-dark vh-100 p-3"
      style={{
        width: '250px',
        position: 'fixed',
        top: '56px',
        left: 0,
        overflowY: 'auto',
      }}
    >
      <h5 className="text-white mb-4">Navigation</h5>
      <NavLink to="/" style={linkStyle}>📊 Dashboard</NavLink>
      <NavLink to="/students" style={linkStyle}>👨‍🎓 Students</NavLink>
      <NavLink to="/teachers" style={linkStyle}>👩‍🏫 Teachers</NavLink>
      <NavLink to="/subjects" style={linkStyle}>📚 Subjects</NavLink>
      <NavLink to="/enrollments" style={linkStyle}>📝 Enrollments</NavLink>
    </div>
  );
};

export default Sidebar;