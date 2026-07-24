import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;