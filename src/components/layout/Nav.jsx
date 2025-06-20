import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Nav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [criminalLawOpen, setCriminalLawOpen] = useState(false);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);
  const navRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setCriminalLawOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Criminal Law sub-items
  const criminalLawItems = [
    { name: 'Drug Offenses', to: '/practice-areas/drug-offenses' },
    { name: 'DUI/DWI', to: '/practice-areas/dui-dwi' },
    { name: 'Assault Charges', to: '/practice-areas/assault' },
    { name: 'Theft Crimes', to: '/practice-areas/theft' },
    { name: 'White Collar Crimes', to: '/practice-areas/white-collar' },
    { name: 'Domestic Violence', to: '/practice-areas/domestic-violence' },
    { name: 'Juvenile Crimes', to: '/practice-areas/juvenile' },
    { name: 'Expungement', to: '/practice-areas/expungement' },
  ];

  const handleMobileDropdown = (label) => {
    setMobileOpenDropdown(mobileOpenDropdown === label ? null : label);
  };

  return (
    <nav
      ref={navRef}
      className="absolute bg-customblue-40 w-full z-50 py-8 top-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src={`${import.meta.env.BASE_URL}CIPS_Logo.png`}
                alt="Company Logo"
                className="h-20 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              <NavLink
                label="Home"
                to="/"
                isActive={location.pathname === '/'}
              />

              <Dropdown
                label="Team"
                isActive={activeDropdown === 'Team'}
                onMouseEnter={() => setActiveDropdown('Team')}
                onMouseLeave={() => setActiveDropdown(null)}
                items={[
                  { name: 'John Doe', to: '/team#JohnDoe' },
                  { name: 'Corley Yisreal', to: '/team#CorleyYisreal' },
                  { name: 'Sarah Parker', to: '/team#SarahParker' },
                ]}
              />

              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('Practice Areas')}
                onMouseLeave={() => {
                  setActiveDropdown(null);
                  setCriminalLawOpen(false);
                }}
              >
                <Dropdown
                  label="Practice Areas"
                  isActive={activeDropdown === 'Practice Areas'}
                  onClick={() => {}}
                  items={[
                    {
                      name: 'Criminal Law',
                      to: '#',
                      onMouseEnter: (e) => {
                        e.preventDefault();
                        setCriminalLawOpen(true);
                      },
                      subItems: criminalLawItems,
                    },
                  ]}
                />
                {criminalLawOpen && (
                  <div
                    className="origin-top-left absolute left-48 top-0 mt-9 w-48 rounded-none shadow-lg bg-black/90 ring-1 ring-gray-800 backdrop-blur-sm"
                    onMouseEnter={() => setCriminalLawOpen(true)}
                    onMouseLeave={() => setCriminalLawOpen(false)}
                  >
                    <div className="py-1">
                      {criminalLawItems.map(({ name, to }) => (
                        <Link
                          key={name}
                          to={to}
                          className="block px-4 py-2 text-sm text-white hover:bg-pink-600 transition-colors duration-200"
                        >
                          {name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Dropdown
                label="Testimonials"
                isActive={activeDropdown === 'Testimonials'}
                onMouseEnter={() => setActiveDropdown('Testimonials')}
                onMouseLeave={() => setActiveDropdown(null)}
                items={[
                  {
                    name: 'Clients Testimonials',
                    to: '/testimonials#clientsTestimonials',
                  },
                  { name: 'Leave A Review', to: '/testimonials#LeaveAReview' },
                ]}
              />

              <Dropdown
                label="Resources"
                isActive={activeDropdown === 'Resources'}
                onMouseEnter={() => setActiveDropdown('Resources')}
                onMouseLeave={() => setActiveDropdown(null)}
                items={[
                  {
                    name: 'Client Portal Guide',
                    to: '/resources#ClientPortalGuide',
                  },
                  { name: 'Case Results', to: '/resources#CaseResults' },
                ]}
              />

              <NavLink
                label="Contact"
                to="/contact"
                isActive={location.pathname === '/contact'}
              />

              <Link
                to="/login"
                className="ml-4 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-none transition-all duration-300"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-pink-600 hover:text-pink-700 focus:outline-none
               transition-colors duration-300"
            >
              {isOpen ? (
                <FiX className="h-8 w-8" />
              ) : (
                <FiMenu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-customblue/30 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink
            label="Home"
            to="/"
            isActive={location.pathname === '/'}
            onClick={() => setIsOpen(false)}
          />

          <MobileDropdown
            label="Team"
            isOpen={mobileOpenDropdown === 'Team'}
            onClick={() => {
              handleMobileDropdown('Team');
              setIsOpen(true);
            }}
            onClose={() => setMobileOpenDropdown(null)}
            items={[
              { name: 'John Doe', to: '/team#JohnDoe' },
              { name: 'Corley Yisreal', to: '/team#CorleyYisreal' },
              { name: 'Sarah Parker', to: '/team#SarahParker' },
            ]}
          />

          <MobileDropdown
            label="Practice Areas"
            isOpen={mobileOpenDropdown === 'Practice Areas'}
            onClick={() => {
              handleMobileDropdown('Practice Areas');
              setIsOpen(true);
            }}
            onClose={() => setMobileOpenDropdown(null)}
            items={[
              {
                name: 'Criminal Law',
                to: '/practice-areas/criminal-law',
                subItems: criminalLawItems,
              },
            ]}
          />

          <MobileDropdown
            label="Testimonials"
            isOpen={mobileOpenDropdown === 'Testimonials'}
            onClick={() => {
              handleMobileDropdown('Testimonials');
              setIsOpen(true);
            }}
            onClose={() => setMobileOpenDropdown(null)}
            items={[
              {
                name: 'Clients Testimonials',
                to: '/testimonials#clientsTestimonials',
              },
              { name: 'Leave A Review', to: '/testimonials#LeaveAReview' },
            ]}
          />

          <MobileDropdown
            label="Resources"
            isOpen={mobileOpenDropdown === 'Resources'}
            onClick={() => {
              handleMobileDropdown('Resources');
              setIsOpen(true);
            }}
            onClose={() => setMobileOpenDropdown(null)}
            items={[
              {
                name: 'Client Portal Guide',
                to: '/resources#ClientPortalGuide',
              },
              { name: 'Case Results', to: '/resources#CaseResults' },
            ]}
          />

          <MobileNavLink
            label="Contact"
            to="/contact"
            isActive={location.pathname === '/contact'}
            onClick={() => setIsOpen(false)}
          />

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block w-full text-left text-white bg-pink-600 hover:bg-pink-700 px-3 py-2 rounded-none text-base font-medium transition-colors duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, label, isActive }) {
  return (
    <Link
      to={to}
      className={`relative text-white drop-shadow-md hover:text-white px-4 py-2 text-sm font-medium transition-colors duration-300 ${isActive ? 'text-pink-600' : ''}`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-4 right-4 h-0.5 bg-pink-600 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      ></span>
    </Link>
  );
}

function MobileNavLink({ to, label, isActive, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive ? 'text-pink-600' : 'text-white hover:text-white'}`}
    >
      {label}
    </Link>
  );
}

function Dropdown({
  label,
  items,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  return (
    <div className="relative">
      <button
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className={`text-white drop-shadow-md hover:text-white px-4 py-2 text-sm font-medium flex items-center transition-colors duration-300 ${isActive ? 'text-pink-600' : ''}`}
      >
        {label}
        <svg
          className={`ml-1 h-4 w-4 transition-transform duration-200 ${isActive ? 'rotate-180 text-pink-600' : ''}`}
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
        <span
          className={`absolute bottom-0 left-4 right-4 h-0.5 bg-pink-600 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        ></span>
      </button>

      {isActive && (
        <div
          className="origin-top-right absolute left-0 mt-0 w-48 rounded-none shadow-lg bg-black/90 backdrop-blur-sm ring-1 ring-gray-800"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="py-1">
            {items.map(({ name, to, subItems, onMouseEnter }) =>
              subItems ? (
                <div
                  key={name}
                  className="relative"
                  onMouseEnter={onMouseEnter}
                >
                  <span className="block px-4 py-2 text-sm text-white hover:bg-pink-600 cursor-default">
                    {name}
                  </span>
                </div>
              ) : (
                <Link
                  key={name}
                  to={to}
                  className="block px-4 py-2 text-sm text-white hover:bg-pink-600 transition-colors duration-200"
                >
                  {name}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileDropdown({ label, items, isOpen, onClick, onClose }) {
  return (
    <div className="space-y-1">
      <button
        onClick={onClick}
        className="w-full text-left text-white hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center justify-between transition-colors duration-300"
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
          {items.flatMap((item) =>
            item.subItems
              ? item.subItems.map((subItem) => (
                  <Link
                    key={subItem.name}
                    to={subItem.to}
                    onClick={onClose}
                    className="block text-white hover:text-white hover:bg-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    {subItem.name}
                  </Link>
                ))
              : [
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={onClose}
                    className="block text-white hover:text-white hover:bg-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    {item.name}
                  </Link>,
                ]
          )}
        </div>
      )}
    </div>
  );
}
