import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar/Navbar';
import Sidebar from '../components/layout/Sidebar/Sidebar';
import Footer from '../components/layout/Footer/Footer';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <div className="app-shell">
      <Navbar onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
      <div
        className={`sidebar-backdrop${sidebarOpen ? ' show' : ''}`}
        onClick={closeSidebar}
        aria-hidden={!sidebarOpen}
      />
      <Sidebar open={sidebarOpen} onNavigate={closeSidebar} />
      <main className="app-main">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
