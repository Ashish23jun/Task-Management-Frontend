import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20 px-6">
        {' '}
        <Outlet />
      </div>
    </>
  );
};
export default AppLayout;
