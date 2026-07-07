import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiHome, FiUser, FiMenu } from 'react-icons/fi';

export const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            🍽️ Hotel Finder
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <FiHome /> Home
            </Link>

            {user?.role === 'restaurant_owner' && (
              <Link to="/owner-dashboard" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
            )}

            <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <FiUser /> Profile
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600"
          >
            <FiMenu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t pt-4">
            <Link to="/" className="block text-gray-700 hover:text-blue-600">
              Home
            </Link>
            {user?.role === 'restaurant_owner' && (
              <Link to="/owner-dashboard" className="block text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
            )}
            <Link to="/profile" className="block text-gray-700 hover:text-blue-600">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-600 hover:text-red-700 font-semibold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
