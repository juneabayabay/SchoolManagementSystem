import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard', icon: '◆', end: true },
  { to: '/students', label: 'Students', icon: '◎' },
  { to: '/teachers', label: 'Teachers', icon: '◇' },
  { to: '/subjects', label: 'Subjects', icon: '▣' },
  { to: '/enrollments', label: 'Enrollments', icon: '▤' },
];

const Sidebar = ({ open, onNavigate }) => (
  <aside className={`app-sidebar${open ? ' open' : ''}`} aria-label="Main navigation">
    <div className="app-sidebar-title">Menu</div>
    {links.map((link) => (
      <NavLink
        key={link.to}
        to={link.to}
        end={link.end}
        className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
        onClick={onNavigate}
      >
        <span className="nav-icon" aria-hidden="true">{link.icon}</span>
        {link.label}
      </NavLink>
    ))}
  </aside>
);

export default Sidebar;
