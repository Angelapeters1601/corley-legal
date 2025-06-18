import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiSearch,
  FiUser,
  FiLock,
  FiSend,
  FiArchive,
  FiAlertCircle,
} from 'react-icons/fi';

const PrisonerMessaging = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedPrisoner, setSelectedPrisoner] = useState(null);

  // Dummy prisoner data
  const prisoners = [
    {
      id: 'DOC-1001',
      name: 'Michael Johnson',
      facility: 'State Correctional Facility',
      status: 'active',
      lastMessage: '2023-11-10',
      unread: true,
    },
    {
      id: 'DOC-1002',
      name: 'David Rodriguez',
      facility: 'Federal Penitentiary',
      status: 'active',
      lastMessage: '2023-11-08',
      unread: false,
    },
    {
      id: 'DOC-1003',
      name: 'James Wilson',
      facility: 'County Jail',
      status: 'restricted',
      lastMessage: '2023-11-05',
      unread: false,
    },
    {
      id: 'DOC-1004',
      name: 'Robert Smith',
      facility: 'State Correctional Facility',
      status: 'active',
      lastMessage: '2023-11-02',
      unread: true,
    },
    {
      id: 'DOC-1005',
      name: 'William Brown',
      facility: 'Federal Penitentiary',
      status: 'inactive',
      lastMessage: '2023-10-28',
      unread: false,
    },
  ];

  // Dummy messages
  const messages = [
    {
      id: 1,
      prisonerId: 'DOC-1001',
      date: '2023-11-10 14:30',
      direction: 'incoming',
      content:
        'Hello Counselor, I wanted to follow up about my appeal paperwork. Have you had a chance to review it?',
      status: 'unread',
    },
    {
      id: 2,
      prisonerId: 'DOC-1001',
      date: '2023-11-08 09:15',
      direction: 'outgoing',
      content:
        'Michael, I have received your documents and will review them this week. Expect my response by Friday.',
      status: 'read',
    },
    {
      id: 3,
      prisonerId: 'DOC-1004',
      date: '2023-11-02 16:45',
      direction: 'incoming',
      content:
        'Urgent: My hearing date was moved up. Need to discuss strategy as soon as possible.',
      status: 'unread',
    },
  ];

  const filteredPrisoners = prisoners.filter((prisoner) => {
    return (
      prisoner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prisoner.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const prisonerMessages = selectedPrisoner
    ? messages.filter((msg) => msg.prisonerId === selectedPrisoner.id)
    : [];

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedPrisoner) {
      // In a real app, this would send to your backend
      alert(`Message sent to ${selectedPrisoner.name}`);
      setNewMessage('');
    }
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
            <FiMail className="mr-3 text-teal-500" />
            Prisoner Messaging Portal
          </h1>
          <p className="text-gray-600 mt-2">
            Securely communicate with incarcerated clients
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prisoners List */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-medium">Incarcerated Clients</h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search prisoners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {filteredPrisoners.map((prisoner) => (
                <div
                  key={prisoner.id}
                  onClick={() => setSelectedPrisoner(prisoner)}
                  className={`p-4 cursor-pointer transition-colors ${selectedPrisoner?.id === prisoner.id ? 'bg-teal-50' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium flex items-center">
                        {prisoner.name}
                        {prisoner.unread && (
                          <span className="ml-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {prisoner.facility}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        prisoner.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : prisoner.status === 'restricted'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {prisoner.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Last message: {prisoner.lastMessage}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Message Area */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
            {selectedPrisoner ? (
              <>
                <div className="p-4 border-b border-gray-200 bg-teal-50">
                  <h2 className="font-medium flex items-center">
                    <FiUser className="mr-2" />
                    {selectedPrisoner.name}
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      {selectedPrisoner.id} • {selectedPrisoner.facility}
                    </span>
                  </h2>
                </div>

                {/* Messages */}
                <div className="p-4 space-y-4 h-[400px] overflow-y-auto">
                  {prisonerMessages.length > 0 ? (
                    prisonerMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.direction === 'incoming' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.direction === 'incoming'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-teal-100 text-teal-800'
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {message.date} •{' '}
                            {message.direction === 'incoming'
                              ? 'Received'
                              : 'Sent'}
                            {message.status === 'unread' &&
                              message.direction === 'incoming' && (
                                <span className="ml-2 text-teal-500 flex items-center">
                                  <FiAlertCircle className="mr-1" /> New
                                </span>
                              )}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      No messages yet with this client
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-end space-x-2">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={`Type your message to ${selectedPrisoner.name}...`}
                      rows="2"
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className={`p-2 rounded-lg ${
                        newMessage.trim()
                          ? 'bg-teal-500 text-white hover:bg-teal-600'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <FiSend className="text-xl" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <FiLock className="mr-1" />
                    All messages are encrypted and monitored
                  </p>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <FiMail className="text-4xl text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700">
                  Select a prisoner
                </h3>
                <p className="text-gray-500 mt-1">
                  Choose an incarcerated client from the list to view and send
                  messages
                </p>
              </div>
            )}
          </div>
        </div>

        {/* System Notices */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-medium text-gray-800 flex items-center">
            <FiAlertCircle className="mr-2 text-yellow-500" />
            Prisoner Messaging Guidelines
          </h2>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-600">
            <li>All messages are subject to monitoring by facility staff</li>
            <li>
              Do not discuss sensitive case details - request a legal visit
              instead
            </li>
            <li>Messages typically take 3-5 business days to be delivered</li>
            <li>Attachments are not permitted through this system</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default PrisonerMessaging;
