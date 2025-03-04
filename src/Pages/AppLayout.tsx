import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20 px-6">
        {' '}
        {/* Adds padding so content is not hidden behind Navbar */}
        <Outlet />
      </div>
    </>
  );
};
export default AppLayout;
