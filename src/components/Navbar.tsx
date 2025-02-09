import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, MessageCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">InSync</div>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 hover:text-indigo-200 ${
                isActive ? 'text-indigo-200' : ''
              }`
            }
          >
            <Home size={20} />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 hover:text-indigo-200 ${
                isActive ? 'text-indigo-200' : ''
              }`
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/chatbot"
            className={({ isActive }) =>
              `flex items-center gap-2 hover:text-indigo-200 ${
                isActive ? 'text-indigo-200' : ''
              }`
            }
          >
            <MessageCircle size={20} />
            <span>Chatbot</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;