import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiFilm,
  FiYoutube,
  FiDownload,
  FiSearch,
  FiClock,
} from 'react-icons/fi';

const LegalBriefings = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for legal briefings
  const briefings = [
    {
      id: 1,
      title: 'Understanding Contract Law Basics',
      category: 'contracts',
      duration: '12:45',
      views: '1.2K',
      date: '2023-10-15',
      youtubeId: 'abc123',
    },
    {
      id: 2,
      title: 'Recent Changes in Employment Law',
      category: 'employment',
      duration: '18:30',
      views: '2.4K',
      date: '2023-11-02',
      youtubeId: 'def456',
    },
    {
      id: 3,
      title: 'Intellectual Property Protection',
      category: 'ip',
      duration: '22:15',
      views: '3.1K',
      date: '2023-09-28',
      youtubeId: 'ghi789',
    },
    {
      id: 4,
      title: 'Navigating Small Claims Court',
      category: 'litigation',
      duration: '15:20',
      views: '0.8K',
      date: '2023-11-18',
      youtubeId: 'jkl012',
    },
    {
      id: 5,
      title: 'Privacy Laws Update 2023',
      category: 'compliance',
      duration: '25:40',
      views: '3.7K',
      date: '2023-10-30',
      youtubeId: 'mno345',
    },
  ];

  const filteredBriefings = briefings.filter((briefing) => {
    const matchesSearch = briefing.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeTab === 'all' || briefing.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Briefings' },
    { id: 'contracts', name: 'Contract Law' },
    { id: 'employment', name: 'Employment Law' },
    { id: 'ip', name: 'Intellectual Property' },
    { id: 'litigation', name: 'Litigation' },
    { id: 'compliance', name: 'Compliance' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8 p-6 bg-white rounded-xl shadow-sm"
        >
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <FiFilm className="mr-3 text-amber-500" />
            Legal Briefings Database
          </h1>
          <p className="text-gray-600 mt-2">
            Educational videos and legal explainers for your practice
          </p>
        </motion.div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search briefings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mr-2 last:mr-0 transition-colors ${
                    activeTab === category.id
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Briefings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBriefings.map((briefing) => (
            <motion.div
              key={briefing.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md"
            >
              <div className="relative pt-[56.25%] bg-gray-200">
                {/* YouTube thumbnail placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiYoutube className="text-red-500 text-5xl" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {briefing.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">
                  {briefing.title}
                </h3>
                <div className="flex justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <FiClock className="mr-1" /> {briefing.date}
                  </span>
                  <span>{briefing.views} views</span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <a
                    href={`https://youtu.be/${briefing.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded flex items-center justify-center"
                  >
                    <FiYoutube className="mr-2" /> Watch
                  </a>
                  <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded">
                    <FiDownload />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBriefings.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <FiSearch className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">
              No briefings found
            </h3>
            <p className="text-gray-500 mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LegalBriefings;
