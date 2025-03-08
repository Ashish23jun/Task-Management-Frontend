import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#020246] text-white py-4 px-6 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold flex items-center gap-4">
          <Link to="/" className="hover:text-gray-300 transition">
            📋 Task Management
          </Link>
          {isAuthenticated && (
            <>
              <span className="text-gray-300">|</span>
              <Link to="/dashboard" className="text-lg hover:text-gray-300 transition">
                Dashboard
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/list" className="text-lg hover:text-gray-300 transition">
                Task List
              </Link>
            </>
          )}
        </div>

        <div className="flex gap-4">
          {!isAuthenticated ? (
            <>
              <Button
                variant="outline"
                className="border-white text-blue-600 hover:bg-white hover:text-blue-600 transition"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant="default"
                className="bg-white text-blue-600 hover:bg-gray-200 transition"
                onClick={() => navigate('/signup')}
              >
                Signup
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              className="bg-red-600 text-white hover:bg-red-700 transition"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
