import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiFrown } from 'react-icons/fi';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-blue-500 mx-auto w-24 h-24 flex items-center justify-center">
          <FiFrown size={64} />
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          404 - Page Not Found
        </h1>

        <p className="text-gray-600">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-pink-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <FiHome className="mr-2" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
