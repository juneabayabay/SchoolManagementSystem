import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const Navbar = ({ onMenuClick, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = (user?.username || 'U')
    .split(/[@.\s]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'U';

  return (
    <nav className="navbar navbar-expand navbar-dark app-navbar fixed-top px-3">
      <div className="container-fluid">
        <button
          type="button"
          className="btn btn-outline-light d-lg-none me-2"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={sidebarOpen}
          onClick={onMenuClick}
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>

        <Link className="navbar-brand mb-0" to="/">
          SchoolMS
        </Link>

        <div className="ms-auto d-flex align-items-center gap-2 gap-sm-3">
          <div className="user-chip d-none d-sm-inline-flex" title={user?.username}>
            <span className="avatar">{initials}</span>
            <span className="text-truncate" style={{ maxWidth: 160 }}>
              {user?.username}
            </span>
          </div>
          <button type="button" className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
