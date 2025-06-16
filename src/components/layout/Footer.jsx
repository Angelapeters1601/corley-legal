import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo Column */}
            <div className="flex flex-col items-start">
              <img
                src={`${import.meta.env.BASE_URL}CIPS_Logo.png`}
                alt="Company Logo"
                className="h-12 w-auto mb-4"
              />

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaFacebook className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaLinkedin className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaInstagram className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-400">
                <p className="mb-2">123 Legal Avenue</p>
                <p className="mb-2">San Antonio, TX 78258</p>
                <p className="mb-2">Phone: (210) 444-2889</p>
                <p>Email: info@corleylegal.com</p>
              </address>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Practice Areas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Secondary Footer */}
        <div className="bg-gray-900 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Corley Legal, PLLC. All rights
                reserved.
              </p>
              <p className="text-gray-400 text-sm">
                This website has been built to be accessible for all users. If
                you experience any difficulty in accessing this website, please
                contact us for assistance.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
