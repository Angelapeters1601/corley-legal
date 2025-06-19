import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
  FaUsers,
  FaBalanceScale,
  FaEnvelopeOpenText,
} from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    {
      icon: FaFacebook,
      url: 'https://www.facebook.com/corleyparalegal',
      label: 'Facebook',
    },
    {
      icon: FaTwitter,
      url: 'https://x.com/@corleyparalegal',
      label: 'X (Twitter)',
    },
    {
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/corleylegal/',
      label: 'LinkedIn',
    },
    {
      icon: FaInstagram,
      url: 'https://www.instagram.com/corley.legal',
      label: 'Instagram',
    },
    {
      icon: FaYoutube,
      url: 'https://www.youtube.com/@corleylegal',
      label: 'YouTube',
    },
  ];

  const quickLinks = [
    {
      icon: FaHome,
      path: '/',
      label: 'Home',
    },
    {
      icon: FaUsers,
      path: '/team',
      label: 'Our Team',
    },
    {
      icon: FaBalanceScale,
      path: '/practice-areas',
      label: 'Practice Areas',
    },
    {
      icon: FaEnvelopeOpenText,
      path: '/contact',
      label: 'Contact',
    },
  ];

  return (
    <footer className="bg-black text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Socials */}
          <div className="space-y-6">
            <img
              src={`${import.meta.env.BASE_URL}CIPS_Logo.png`}
              alt="Company Logo"
              className="h-30 w-auto"
            />
            <div className="flex space-x-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-pink-500">Contact Us</h3>
            <div className="text-gray-400 text-sm space-y-2">
              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1" />
                99 Wall Street Suite 4837, New York, NY 10005
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt />
                (212) 347-5020
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope />
                info@corley.legal
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-pink-500">Quick Links</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i} className="flex items-center gap-2">
                  <link.icon className="text-pink-500" />
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-pink-500">
              Working Hours
            </h3>
            <p className="text-gray-400 text-sm">
              Mon – Fri: 9:00 AM – 6:00 PM <br />
              Sat – Sun: Closed
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Corley Integrated Paralegal
            Services. All rights reserved.
          </p>
          <p>
            Built for accessibility. Contact us if you encounter any issues.
          </p>
        </div>
      </div>
    </footer>
  );
}
