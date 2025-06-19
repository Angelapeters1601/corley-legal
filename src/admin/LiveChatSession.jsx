// LiveChatSessions.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { FiMessageCircle } from 'react-icons/fi';

export default function LiveChatSessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('session_id, message, created_at')
        .order('created_at', { ascending: false });

      if (!error && data.length > 0) {
        const latestBySession = {};
        for (const msg of data) {
          if (!latestBySession[msg.session_id]) {
            latestBySession[msg.session_id] = msg;
          }
        }
        setSessions(Object.values(latestBySession));
      }
    };

    fetchSessions();
  }, []);

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FiMessageCircle className="text-blue-500" />
        Chat Sessions
      </h1>

      {sessions.length === 0 ? (
        <p className="text-gray-500">No chat sessions yet.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li
              key={session.session_id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <div>
                <p className="font-medium">
                  Session ID: {session.session_id.slice(0, 8)}...
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {session.message.slice(0, 60)}...
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {formatTime(session.created_at)}
                </span>
                <Link
                  to={`/admin/live-agent/${session.session_id}`}
                  className="bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 text-sm"
                >
                  Open
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
