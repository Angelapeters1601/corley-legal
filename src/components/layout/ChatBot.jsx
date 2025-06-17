import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiUser, FiX } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';

export default function ChatBot({ onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! 👋 Welcome to Corley Integrated Paralegals Services. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [awaitingName, setAwaitingName] = useState(false);
  const [awaitingContact, setAwaitingContact] = useState(false);
  const [userName, setUserName] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user',
      text: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botReply = generateBotReply(input.trim());
      setMessages((prev) => [
        ...prev,
        {
          ...botReply,
          timestamp: new Date(),
        },
      ]);

      if (awaitingName) {
        setUserName(input.trim());
        setAwaitingName(false);
      } else if (awaitingContact) {
        setAwaitingContact(false);
      }
    }, 500);

    setInput('');
  };

  const generateBotReply = (question) => {
    const lowerQ = question.toLowerCase();

    if (awaitingName) {
      return {
        sender: 'bot',
        text: `Nice to meet you, ${question.trim()}! How can I help you today?`,
      };
    }

    if (awaitingContact) {
      return {
        sender: 'bot',
        text: `Thank you! An agent will contact you at ${question.trim()} shortly.`,
        isTransferComplete: true,
      };
    }

    if (lowerQ.includes('hi') || lowerQ.includes('hello')) {
      return {
        sender: 'bot',
        text: 'Hello! 😊 Welcome to Corley Integrated Paralegals Services.',
      };
    }

    if (lowerQ.includes('how are you')) {
      return { sender: 'bot', text: "I'm just a bot, but thanks for asking!" };
    }

    if (lowerQ.includes('your name')) {
      return { sender: 'bot', text: "I'm Lex, your virtual assistant." };
    }

    if (lowerQ.includes('my name')) {
      setAwaitingName(true);
      return { sender: 'bot', text: "What's your name?" };
    }

    if (lowerQ.includes('contact') || lowerQ.includes('phone')) {
      return {
        sender: 'bot',
        text: 'Our number is (212) 347-5020 or you can send us a mail at info@corley.legal. Would you like to speak to an agent?',
      };
    }

    if (lowerQ.includes('location') || lowerQ.includes('address')) {
      return {
        sender: 'bot',
        text: "We're located at 99 Wall Street Suite 4837, New York, NY 10005.",
      };
    }

    if (lowerQ.includes('specialization') || lowerQ.includes('specialty')) {
      return {
        sender: 'bot',
        text: 'We specialise in criminal law.',
      };
    }

    if (lowerQ.includes('founder') || lowerQ.includes('corley')) {
      return {
        sender: 'bot',
        text: 'Corley Paralegals was founded by James Corley in 2005.',
      };
    }

    if (lowerQ.includes('company') || lowerQ.includes('about')) {
      return {
        sender: 'bot',
        text: "We're Corley Paralegals, a premier legal support firm based in New York.",
      };
    }

    if (
      lowerQ.includes('agent') ||
      lowerQ.includes('human') ||
      lowerQ.includes('representative')
    ) {
      setIsTransferring(true);
      return {
        sender: 'bot',
        text: 'Connecting you to a live agent... Please hold. 🕒',
        isTransfer: true,
      };
    }

    return {
      sender: 'bot',
      text: "I'm not sure about that. Would you like to speak with a live agent?",
      showTransferButton: true,
    };
  };

  const handleTransfer = () => {
    setIsTransferring(true);
    setMessages((prev) => [
      ...prev,
      {
        sender: 'bot',
        text: 'Please share your contact info so an agent can reach you:',
        isTransferPrompt: true,
        timestamp: new Date(),
      },
    ]);
    setAwaitingContact(true);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-20 right-6 bg-white border border-gray-200 rounded-2xl shadow-2xl w-96 h-[32rem] z-50 flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-200 to-blue-300 text-gray-800 p-4 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-full">
            <FaRobot className="w-5 h-5 text-pink-500" />
          </div>
          <div>
            <h3 className="font-semibold">
              {isTransferring ? 'Connecting to agent...' : 'Corley Paralegals'}
            </h3>
            <p className="text-xs opacity-80">
              {isTransferring ? 'Please wait...' : 'Virtual Assistant'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 transition-colors focus:outline-none"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="p-4 flex-1 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* Bot Avatar */}
              {msg.sender === 'bot' && (
                <div className="bg-pink-100 p-2 rounded-full flex-shrink-0 shadow-sm">
                  <FaRobot className="w-5 h-5 text-pink-500" />
                </div>
              )}

              <div className="flex flex-col max-w-[80%]">
                <div
                  className={`p-4 rounded-2xl text-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-200 text-gray-800 rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                  {msg.showTransferButton && (
                    <button
                      onClick={handleTransfer}
                      className="block mt-2 bg-blue-300 hover:bg-blue-400 text-gray-800 px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Connect to Live Agent
                    </button>
                  )}
                </div>
                <span
                  className={`text-xs mt-1 px-1 text-gray-500 ${
                    msg.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </span>
              </div>

              {/* User Avatar */}
              {msg.sender === 'user' && (
                <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                  <FiUser className="w-5 h-5 text-blue-500" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              awaitingName
                ? 'Your name...'
                : awaitingContact
                  ? 'Your phone/email...'
                  : 'Type your message...'
            }
            className="flex-1 p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <FiSend size={18} />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          {isTransferring
            ? 'Connecting you to an agent...'
            : 'We value your privacy. Your information is secure.'}
        </p>
      </div>
    </div>
  );
}
