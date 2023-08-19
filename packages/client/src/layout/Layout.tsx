import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
  return (
    <>
      <main style={{ height: 'calc(100% - 76px)', backgroundColor: '#F9F5F2' }}>
        <Outlet />
      </main>
      <Header />
    </>
  );
};

export default Layout;
