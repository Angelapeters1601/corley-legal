import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      ref={navRef}
      className="bg-black/80 backdrop-blur-md fixed py-5
      top-0 w-full z-50 shadow-lg border-b p-5order-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/CIPS_Logo.png"
                alt="Company Logo"
                className="h-20 w-30"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <NavLink label="Home" to="/" />
              <Dropdown
                label="Team"
                isActive={activeDropdown === 'Team'}
                onClick={() =>
                  setActiveDropdown(activeDropdown === 'Team' ? null : 'Team')
                }
                items={[
                  { name: 'Members', to: '/team#members' },
                  { name: 'Leadership', to: '/team#leadership' },
                ]}
              />
              <Dropdown
                label="Practice Area"
                isActive={activeDropdown === 'Practice Area'}
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === 'Practice Area' ? null : 'Practice Area'
                  )
                }
                items={[
                  { name: 'Corporate', to: '/practice-areas#corporate' },
                  { name: 'Family', to: '/practice-areas#family' },
                ]}
              />
              <Dropdown
                label="Testimonials"
                isActive={activeDropdown === 'Testimonials'}
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === 'Testimonials' ? null : 'Testimonials'
                  )
                }
                items={[
                  { name: 'Clients', to: '/testimonials#clients' },
                  { name: 'Awards', to: '/testimonials#awards' },
                ]}
              />
              <Dropdown
                label="Resources"
                isActive={activeDropdown === 'Resources'}
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === 'Resources' ? null : 'Resources'
                  )
                }
                items={[
                  { name: 'Blog', to: '/resources#blog' },
                  { name: 'Guides', to: '/resources#guides' },
                ]}
              />
              <NavLink label="Contact" to="/contact" />
              <Link
                to="/login"
                className="ml-4 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md transition-all duration-300"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink
              label="Home"
              to="/"
              onClick={() => setIsOpen(false)}
            />
            <MobileDropdown
              label="Team"
              items={[
                { name: 'Members', to: '/team#members' },
                { name: 'Leadership', to: '/team#leadership' },
              ]}
              onClick={() => setIsOpen(false)}
            />
            <MobileDropdown
              label="Practice Area"
              items={[
                { name: 'Corporate', to: '/practice-areas#corporate' },
                { name: 'Family', to: '/practice-areas#family' },
              ]}
              onClick={() => setIsOpen(false)}
            />
            <MobileDropdown
              label="Testimonials"
              items={[
                { name: 'Clients', to: '/testimonials#clients' },
                { name: 'Awards', to: '/testimonials#awards' },
              ]}
              onClick={() => setIsOpen(false)}
            />
            <MobileDropdown
              label="Resources"
              items={[
                { name: 'Blog', to: '/resources#blog' },
                { name: 'Guides', to: '/resources#guides' },
              ]}
              onClick={() => setIsOpen(false)}
            />
            <MobileNavLink
              label="Contact"
              to="/contact"
              onClick={() => setIsOpen(false)}
            />
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left text-white bg-pink-600 hover:bg-pink-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="relative text-gray-300 hover:text-white px-3 py-2 text-sm font-medium group transition-colors duration-300"
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({ to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
    >
      {label}
    </Link>
  );
}

function Dropdown({ label, items, isActive, onClick }) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium flex items-center transition-colors duration-300 group"
      >
        {label}
        <svg
          className={`ml-1 h-4 w-4 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
      </button>

      {isActive && (
        <div className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 transform opacity-100 scale-100">
          <div className="py-1">
            {items.map(({ name, to }) => (
              <Link
                key={name}
                to={to}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 transition-colors duration-200"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileDropdown({ label, items, onClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between transition-colors duration-300"
      >
        {label}
        <svg
          className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="pl-4 space-y-1">
          {items.map(({ name, to }) => (
            <Link
              key={name}
              to={to}
              onClick={onClick}
              className="block text-gray-400 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
