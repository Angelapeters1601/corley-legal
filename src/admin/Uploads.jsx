import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUpload,
  FiFileText,
  FiSearch,
  FiTrash2,
  FiDownload,
  FiFolder,
  FiCheckCircle,
} from 'react-icons/fi';

const Uploads = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);

  // Dummy documents data
  const documents = [
    {
      id: 'doc-001',
      name: 'Client Contract Agreement.pdf',
      category: 'contracts',
      size: '2.4 MB',
      uploaded: '2023-11-15',
      downloads: 12,
    },
    {
      id: 'doc-002',
      name: 'Case Brief - Johnson v. State.docx',
      category: 'case-briefs',
      size: '1.8 MB',
      uploaded: '2023-11-10',
      downloads: 8,
    },
    {
      id: 'doc-003',
      name: 'Privacy Policy Template.pdf',
      category: 'templates',
      size: '3.1 MB',
      uploaded: '2023-11-08',
      downloads: 23,
    },
    {
      id: 'doc-004',
      name: 'Appeal Motion Draft.pdf',
      category: 'motions',
      size: '5.2 MB',
      uploaded: '2023-11-05',
      downloads: 5,
    },
    {
      id: 'doc-005',
      name: 'Deposition Transcript - Smith.pdf',
      category: 'depositions',
      size: '7.5 MB',
      uploaded: '2023-11-01',
      downloads: 3,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Documents' },
    { id: 'contracts', name: 'Contracts' },
    { id: 'case-briefs', name: 'Case Briefs' },
    { id: 'templates', name: 'Templates' },
    { id: 'motions', name: 'Motions' },
    { id: 'depositions', name: 'Depositions' },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'all' || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    // Simulate file upload
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowUploadSuccess(true);
          setTimeout(() => setShowUploadSuccess(false), 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

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
            <FiUpload className="mr-3 text-indigo-500" />
            Legal Document Uploads
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and organize your legal documents and forms
          </p>
        </motion.div>

        {/* Upload Area */}
        <div
          className={`mb-8 p-6 rounded-xl border-2 border-dashed transition-all ${
            dragActive
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <FiUpload className="mx-auto text-4xl text-indigo-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">
              {dragActive ? 'Drop files here' : 'Drag & drop files to upload'}
            </h3>
            <p className="text-gray-500 mt-1 mb-4">
              or{' '}
              <span className="text-indigo-600 cursor-pointer">
                browse files
              </span>{' '}
              on your computer
            </p>
            <p className="text-xs text-gray-400">
              PDF, DOCX, TXT files up to 50MB
            </p>
          </div>

          {uploadProgress > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1 text-right">
                {uploadProgress}% uploaded
              </p>
            </div>
          )}

          {showUploadSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center"
            >
              <FiCheckCircle className="mr-2" />
              File uploaded successfully!
            </motion.div>
          )}
        </div>

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
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mr-2 last:mr-0 transition-colors ${
                    activeCategory === category.id
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <motion.div
                key={doc.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
              >
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <FiFileText className="text-2xl text-indigo-500 mr-3" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{doc.name}</h3>
                    <p className="text-xs text-gray-500 truncate">
                      {doc.size} • {doc.uploaded}
                    </p>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500 flex items-center">
                    <FiDownload className="mr-1" /> {doc.downloads} downloads
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg">
                      <FiDownload />
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <FiFolder className="mx-auto text-4xl text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">
              No documents found
            </h3>
            <p className="text-gray-500 mt-1">
              {searchQuery
                ? 'Try a different search'
                : 'Upload your first document'}
            </p>
          </div>
        )}

        {/* Storage Usage */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-medium text-gray-800 mb-4">Storage Usage</h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: '35%' }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>15.2 GB of 50 GB used</span>
            <span>35%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Uploads;
