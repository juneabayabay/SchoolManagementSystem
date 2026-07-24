import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <div className="auth-screen">
    <div className="auth-card">
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;
