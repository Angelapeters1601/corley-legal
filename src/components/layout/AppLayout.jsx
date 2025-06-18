import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import Nav from './Nav.jsx';
import Footer from './Footer';
import { FiMessageCircle } from 'react-icons/fi';
import ChatBot from './ChatBot';
import { AnimatePresence } from 'framer-motion';

function AppLayout() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Nav />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />

      {/* ChatBot with animation */}
      <AnimatePresence>
        {showChat && (
          <ChatBot key="chatbot" onClose={() => setShowChat(false)} />
        )}
      </AnimatePresence>

      {/* Chatbot Icon Button */}
      {!showChat && (
        <button
          className="fixed bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg z-50 hover:bg-blue-600 transition"
          aria-label="Open chatbot"
          onClick={() => setShowChat(true)}
        >
          <FiMessageCircle color="white" size={24} />
        </button>
      )}
    </div>
  );
}

export default AppLayout;
