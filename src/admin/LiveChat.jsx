import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiX } from 'react-icons/fi';

export default function LiveChat() {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [sessionStatus, setSessionStatus] = useState('active');
  const messagesEndRef = useRef(null);

  // 1. Fetch chat history and metadata
  useEffect(() => {
    const fetchData = async () => {
      // Get messages
      const { data: messages } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('session_id', sessionId)
        .order('timestamp', { ascending: true });

      // Get session metadata
      const { data: metadata } = await supabase
        .from('chat_metadata')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      setMessages(messages || []);
      setContactInfo(metadata?.contact_info || 'No contact info');
      setSessionStatus(metadata?.status || 'active');
    };

    fetchData();
  }, [sessionId]);

  // 2. Subscribe to new messages
  useEffect(() => {
    const channel = supabase
      .channel(`chat:${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_sessions',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'chat_metadata',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          setSessionStatus(payload.new.status);
          if (payload.new.status === 'completed') {
            alert('Session has been ended by the user');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  // 3. Auto-scroll to newest message
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  // 4. Send message as agent
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || sessionStatus === 'completed') return;

    const newMessage = {
      session_id: sessionId,
      sender: 'agent',
      text: input.trim(),
      timestamp: new Date().toISOString(),
      id: Math.random().toString(36),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    const { error } = await supabase.from('chat_sessions').insert([
      {
        session_id: sessionId,
        sender: 'agent',
        text: input.trim(),
      },
    ]);

    if (error) {
      setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id));
      alert('Failed to send message');
    }
  };

  // 5. End session handler
  const handleEndSession = async () => {
    if (window.confirm('Are you sure you want to end this session?')) {
      await supabase
        .from('chat_metadata')
        .update({ status: 'completed' })
        .eq('session_id', sessionId);
      setSessionStatus('completed');
      alert('Session ended successfully');
    }
  };

  // 6. Format timestamp
  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="max-w-2xl mt-[150px] mx-auto p-6 bg-white rounded-xl shadow-xl border border-gray-100"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-gray-800"
          >
            Chat with <span className="text-blue-600">{contactInfo}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-500"
          >
            Session: {sessionId.slice(0, 8)}... • Status:
            <span
              className={`ml-1 font-medium ${
                sessionStatus === 'active' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {sessionStatus}
            </span>
          </motion.p>
        </div>

        {sessionStatus === 'active' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEndSession}
            className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm shadow-md hover:shadow-lg transition-all"
          >
            <FiX size={16} />
            End Session
          </motion.button>
        )}
      </div>

      {/* Message History */}
      <div className="h-[400px] overflow-y-auto mb-6 pr-2">
        <div className="space-y-3">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.sender === 'agent'
                      ? 'bg-gradient-to-br from-blue-100 to-blue-50 text-blue-900 rounded-br-none shadow-sm'
                      : 'bg-gray-50 text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="text-gray-800">{msg.text}</p>
                  <p className="text-xs mt-2 opacity-70">
                    {formatTime(msg.timestamp)} • {msg.sender}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <AnimatePresence mode="wait">
        {sessionStatus === 'active' ? (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onSubmit={handleSend}
            className="flex gap-3 items-center"
          >
            <motion.input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your reply..."
              className="flex-1 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all"
              whileFocus={{ borderColor: '#3b82f6' }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl shadow-md hover:shadow-lg transition-all"
              disabled={!input.trim()}
            >
              <FiSend size={18} />
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-gray-50 text-center text-gray-600 rounded-xl border border-gray-200"
          >
            <p className="font-medium">This conversation has ended</p>
            <p className="text-sm mt-1">No further messages can be sent</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
