import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export default function LiveChat() {
  const { sessionId } = useParams(); // From URL: `/live-chat/:sessionId`
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const messagesEndRef = useRef(null);

  // 1. Fetch chat history and contact info
  useEffect(() => {
    const fetchData = async () => {
      // Get messages
      const { data: messages } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('session_id', sessionId)
        .order('timestamp', { ascending: true });

      // Get user's contact info (email/phone)
      const { data: metadata } = await supabase
        .from('chat_metadata')
        .select('contact_info')
        .eq('session_id', sessionId)
        .single();

      setMessages(messages || []);
      setContactInfo(metadata?.contact_info || 'No contact info');
    };

    fetchData();
  }, [sessionId]);

  // 2. Subscribe to new messages (realtime)
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
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // Cleanup
    };
  }, [sessionId]);

  // 3. Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 4. Send message as agent
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add message to local state IMMEDIATELY (optimistic update)
    const newMessage = {
      session_id: sessionId,
      sender: 'agent',
      text: input.trim(),
      timestamp: new Date().toISOString(),
      id: Math.random().toString(36), // Temporary ID
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    // Then send to Supabase

    const { error } = await supabase.from('chat_sessions').insert([
      {
        session_id: sessionId,
        sender: 'agent', // Differentiate agent messages
        text: input.trim(),
      },
    ]);
    if (error) {
      // Rollback if Supabase fails
      setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id));
      alert('Failed to send message');
    }
  };

  // 5. Format timestamp
  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Chat with {contactInfo}</h2>
      <p className="text-sm text-gray-500 mb-4">
        Session ID: {sessionId.slice(0, 8)}...
      </p>

      {/* Message History */}
      <div className="h-96 overflow-y-auto mb-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                msg.sender === 'agent'
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your reply..."
          className="flex-1 border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}
