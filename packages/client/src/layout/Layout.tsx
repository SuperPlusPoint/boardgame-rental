import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ height: 'calc(100% - 61px)' }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
