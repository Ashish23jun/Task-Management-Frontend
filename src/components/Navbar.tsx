import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Use Link for better routing
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white py-4 px-6 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Title & Navigation Links */}
        <div className="text-xl font-bold flex items-center gap-4">
          <Link to="/" className="hover:text-gray-300 transition">
            📋 Task Management
          </Link>
          <span className="text-gray-300">|</span>
          <Link to="/dashboard" className="text-lg hover:text-gray-300 transition">
            Dashboard
          </Link>
          <span className="text-gray-300">|</span>
          <Link to="/list" className="text-lg hover:text-gray-300 transition">
            Task List
          </Link>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
