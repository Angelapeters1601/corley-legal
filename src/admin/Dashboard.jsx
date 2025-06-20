import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiLogOut,
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiMessageSquare,
  FiDollarSign,
  FiUpload,
  FiInbox,
  FiFilm,
} from 'react-icons/fi';

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('');
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email);
    }
    getUser();

    async function fetchRecentSubmissions() {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error) setRecentSubmissions(data);
      setLoading(false);
    }
    fetchRecentSubmissions();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  const dashboardItems = [
    {
      icon: <FiMessageSquare />,
      label: 'View Form Submissions',
      color: 'bg-blue-100 text-blue-600',
      path: '/admin/forms',
    },
    {
      icon: <FiUser />,
      label: 'Website Visitor Info',
      color: 'bg-pink-100 text-pink-600',
      path: '/admin/visitors',
    },
    {
      icon: <FiMail />,
      label: 'Live Agent Chat',
      color: 'bg-red-100 text-red-600',
      path: '/admin/live-chats',
    },
    {
      icon: <FiDollarSign />,
      label: 'Orders & Payments',
      color: 'bg-purple-100 text-purple-600',
      path: '/admin/orders',
    },
    {
      icon: <FiUpload />,
      label: 'Upload Legal PDFs',
      color: 'bg-indigo-100 text-indigo-600',
      path: '/admin/uploads',
    },
    {
      icon: <FiInbox />,
      label: 'Prisoner Messaging',
      color: 'bg-teal-100 text-teal-600',
      path: '/admin/messaging',
    },
    {
      icon: <FiFilm />,
      label: 'Legal Briefings',
      color: 'bg-amber-100 text-amber-600',
      path: '/admin/briefings',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen mt-[125px] bg-gradient-to-br from-blue-50 to-pink-50 p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex justify-between items-center mb-8 p-6 bg-white rounded-xl shadow-sm"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 flex items-center">
              <FiUser className="mr-2" /> {userEmail}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <FiLogOut className="mr-2" /> Logout
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {dashboardItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                onClick={() => navigate(item.path)}
                className={`p-6 rounded-xl shadow-sm cursor-pointer transition-all ${item.color} hover:shadow-md`}
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-4">{item.icon}</div>
                  <h3 className="font-medium">{item.label}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
