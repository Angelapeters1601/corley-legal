import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiMessageSquare,
} from 'react-icons/fi';
import Loader from '../Ui/Loader';

export default function SubmissionDetail() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSubmission() {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('id', id)
        .single();

      if (error) navigate('/admin');
      else setSubmission(data);
      setLoading(false);
    }
    fetchSubmission();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex items-center mb-6"
        >
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin')}
            className="flex items-center mr-4 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <FiArrowLeft className="mr-2 text-blue-500" />
            Back to Dashboard
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-800">
            Client Submission Details
          </h1>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          {/* Client Header */}
          <div className="bg-gradient-to-r from-blue-500 to-pink-500 p-6 text-white">
            <h2 className="text-2xl font-bold">
              {submission.first_name} {submission.last_name}
            </h2>
            <p className="flex items-center mt-1">
              <FiCalendar className="mr-2" />
              Submitted on: {new Date(submission.created_at).toLocaleString()}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                <FiMail className="mr-2 text-blue-500" />
                Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium flex items-center">
                    <FiMail className="mr-2 text-pink-500" />
                    {submission.email}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium flex items-center">
                    <FiPhone className="mr-2 text-blue-500" />
                    {submission.phone || 'Not provided'}
                  </p>
                </div>

                {submission.address && (
                  <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium flex items-start">
                      <FiMapPin className="mr-2 text-purple-500 mt-1" />
                      <span>
                        {submission.address}
                        <br />
                        {submission.city}, {submission.state} {submission.zip}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                <FiMessageSquare className="mr-2 text-pink-500" />
                Client Message
              </h3>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg whitespace-pre-line">
                {submission.help_message}
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Existing Client</p>
                <p className="font-medium">
                  {submission.existing_client ? 'Yes' : 'No'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Disclaimer Accepted</p>
                <p className="font-medium">
                  {submission.disclaimer ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
