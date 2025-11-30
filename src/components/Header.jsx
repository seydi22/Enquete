import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-text-primary tracking-tight">Data Rapports</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-2 bg-neutral-light p-2 rounded-full">
            <NavLink
              to="/saisie"
              className={({ isActive }) =>
                `px-5 py-2 text-base font-medium transition-colors duration-200 rounded-full ${
                  isActive
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-text-secondary hover:bg-white/60'
                }`
              }
            >
              Saisie
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `px-5 py-2 text-base font-medium transition-colors duration-200 rounded-full ${
                  isActive
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-text-secondary hover:bg-white/60'
                }`
              }
            >
              Admin
            </NavLink>
          </nav>
          <div className="flex items-center">
             <div className="p-2 rounded-full hover:bg-neutral-light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
