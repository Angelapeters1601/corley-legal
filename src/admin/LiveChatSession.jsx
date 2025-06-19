import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export default function LiveChatSessions() {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('chat_metadata')
          .select(
            `
            session_id, 
            contact_info, 
            created_at, 
            status,
            last_message:chat_sessions!inner(
              text,
              timestamp
            )
          `
          )
          .eq('transferred', true)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        setSessions(
          data.map((session) => ({
            ...session,
            contact_info:
              session.contact_info ||
              session.last_message?.text ||
              'No contact info yet',
          }))
        );
      } catch (err) {
        console.error('Error fetching sessions:', err);
        setError('Failed to load chat sessions');
        setSessions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();

    // Realtime subscription
    const subscription = supabase
      .channel('live_chat_sessions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_metadata',
          filter: 'transferred=eq.true',
        },
        (payload) => {
          setSessions((prev) => {
            const existing = prev.find(
              (s) => s.session_id === payload.new.session_id
            );
            if (existing) {
              return prev.map((s) =>
                s.session_id === payload.new.session_id
                  ? {
                      ...payload.new,
                      contact_info: payload.new.contact_info || s.contact_info,
                    }
                  : s
              );
            }
            return [
              {
                ...payload.new,
                contact_info: payload.new.contact_info || 'No contact info yet',
              },
              ...prev,
            ];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const formatTime = (date) => {
    try {
      return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      active: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
    };
    return (
      <span
        className={`text-xs px-2 py-1 rounded-full ${
          statusClasses[status?.toLowerCase()] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {status?.toLowerCase() || 'pending'}
      </span>
    );
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
        <h2 className="text-xl font-semibold mb-6">Live Chat Sessions</h2>
        <div className="text-center py-8 text-red-500">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-sm bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-semibold mb-6">Live Chat Sessions</h2>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-600"></div>
        </div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-2">No active chat sessions</p>
          <p className="text-sm text-gray-400">
            Transferred chats will appear here
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li
              key={session.session_id}
              className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-800">
                      Session: {session.session_id?.slice(0, 8)}...
                    </p>
                    {getStatusBadge(session.status)}
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Contact:</span>{' '}
                    {session.contact_info}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Started: {formatTime(session.created_at)}
                  </p>
                </div>
                <Link
                  to={`/admin/live-chat/${session.session_id}`}
                  className="text-sm bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded transition-colors"
                >
                  Open Chat
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
