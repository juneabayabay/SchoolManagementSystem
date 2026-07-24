import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar/Navbar';
import Sidebar from '../components/layout/Sidebar/Sidebar';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid p-4" style={{ marginLeft: '250px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;