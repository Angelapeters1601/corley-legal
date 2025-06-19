// LiveChatSession.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { FiSend } from 'react-icons/fi';

export default function LiveChatSession() {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (!error && data) setMessages(data);
    };

    fetchMessages();

    const channel = supabase
      .channel(`chat:${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (newMessage.trim()) {
      await supabase.from('chat_messages').insert({
        session_id: sessionId,
        sender: 'agent',
        message: newMessage.trim(),
      });
      setNewMessage('');
    }
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-xl h-[80vh] flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        Live Chat Session - #{sessionId ? sessionId.slice(0, 8) : 'Loading...'}
      </h1>

      <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={msg.id || index}
            className={`mb-4 flex ${
              msg.sender === 'agent' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs md:max-w-sm p-3 rounded-2xl shadow-sm ${
                msg.sender === 'agent'
                  ? 'bg-green-100 text-gray-800 rounded-br-none'
                  : msg.sender === 'bot'
                    ? 'bg-white text-gray-800 rounded-bl-none'
                    : 'bg-blue-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs text-gray-500 mt-1 text-right">
                {formatTime(msg.created_at)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your reply..."
          className="flex-1 border border-gray-300 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl transition-colors"
        >
          <FiSend size={18} />
        </button>
      </div>
    </div>
  );
}
