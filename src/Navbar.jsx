import React from 'react';
import { UserCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Check if the admin is logged in (You can modify this logic based on your actual auth flow)
  const isAdminLoggedIn = localStorage.getItem('adminToken'); // Example: Check if an admin token exists in local storage

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Left side - FAQ Board Button */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              FAQ Board
            </Link>
          </div>

          {/* Right side - Navigation Buttons */}
          <div className="flex items-center space-x-4">
            {/* Admin Button */}
            {isAdminLoggedIn ? (
              <Link
                to="/admin"
                className="flex items-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                <UserCircle className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <UserCircle className="w-4 h-4 mr-2" />
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
