import React, { useState } from 'react';
import { FiMessageSquare, FiSend } from 'react-icons/fi';

export default function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          text: newMessage,
          sender: 'agent',
          timestamp: new Date(),
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FiMessageSquare className="text-green-500" />
        Live Chat Agent
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="h-96 p-4 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-3">
              <div
                className={`p-3 rounded-lg ${msg.sender === 'agent' ? 'bg-blue-100 ml-auto w-3/4' : 'bg-gray-100 mr-auto w-3/4'}`}
              >
                {msg.text}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t p-4 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-l-lg p-2 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
}
