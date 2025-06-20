import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiUser, FiX } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { supabase } from '../../services/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

const SESSION_KEY = 'corley_chat_session';

export default function ChatBot({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [awaitingContact, setAwaitingContact] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef(null);

  // Session ID management

  useEffect(() => {
    const existingId = localStorage.getItem(SESSION_KEY) || uuidv4();
    localStorage.setItem(SESSION_KEY, existingId);
    setSessionId(existingId);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`${SESSION_KEY}_messages`, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel(`user_chat_${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_sessions',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          if (payload.new.sender === 'agent') {
            setMessages((prev) => {
              const exists = prev.some(
                (m) =>
                  m.text === payload.new.text &&
                  new Date(m.timestamp).getTime() ===
                    new Date(payload.new.timestamp).getTime()
              );
              return exists
                ? prev
                : [
                    ...prev,
                    {
                      sender: 'agent',
                      text: payload.new.text,
                      timestamp: new Date(payload.new.timestamp),
                    },
                  ];
            });
          }
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('session_id', sessionId)
        .order('timestamp', { ascending: true });

      if (data && data.length > 0) {
        setMessages(
          data.map((msg) => ({
            sender: msg.sender,
            text: msg.text,
            timestamp: new Date(msg.timestamp),
          }))
        );
      } else {
        // 🟡 Try restoring from localStorage
        const saved = localStorage.getItem(`${SESSION_KEY}_messages`);
        if (saved) {
          setMessages(JSON.parse(saved));
          return;
        }

        // 🟢 If nothing saved, show welcome message
        const welcome = {
          sender: 'bot',
          text: 'Hello! 👋 Welcome to Corley Integrated Paralegals Services. How can I help you today?',
          timestamp: new Date(),
          quickReplies: [
            'What services do you offer?',
            'How much does it cost?',
            'I need document preparation',
          ],
        };
        setMessages([welcome]);
        await supabase.from('chat_sessions').insert([
          {
            ...welcome,
            session_id: sessionId,
          },
        ]);
      }
    };

    if (sessionId) loadMessages();
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || (isTransferring && !awaitingContact)) return;

    const dbMessage = {
      session_id: sessionId,
      sender: 'user',
      text: input.trim(),
      timestamp: new Date().toISOString(),
    };

    const uiMessage = {
      sender: 'user',
      text: input.trim(),
      timestamp: new Date(),
    };

    if (awaitingContact) {
      try {
        await supabase.from('chat_sessions').insert([dbMessage]);

        await supabase
          .from('chat_metadata')
          .update({
            contact_info: input.trim(),
            status: 'active',
            updated_at: new Date().toISOString(),
          })
          .eq('session_id', sessionId);

        setMessages((prev) => [...prev, uiMessage]);
        setInput('');
        setAwaitingContact(false);

        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: `Thank you! An agent will contact you at ${input.trim()} shortly.`,
            timestamp: new Date(),
          },
        ]);

        await supabase
          .from('chat_metadata')
          .update({ transferred: true })
          .eq('session_id', sessionId);

        return;
      } catch (error) {
        console.error('Error submitting contact info:', error);
        return;
      }
    }

    setMessages((prev) =>
      [...prev, uiMessage].sort((a, b) => a.timestamp - b.timestamp)
    );
    await supabase.from('chat_sessions').insert([dbMessage]);
    setInput('');

    if (!isTransferring) {
      setIsTyping(true);
      setTimeout(async () => {
        const botReply = {
          ...generateBotReply(input.trim()),
          timestamp: new Date(),
        };

        try {
          await supabase.from('chat_sessions').insert([
            {
              session_id: sessionId,
              sender: 'bot',
              text: botReply.text,
              timestamp: botReply.timestamp.toISOString(),
            },
          ]);
          setMessages((prev) =>
            [...prev, botReply].sort((a, b) => a.timestamp - b.timestamp)
          );
        } catch (error) {
          console.error('Bot reply failed:', error);
        }

        setIsTyping(false);
      }, 1000);
    }
  };

  const generateBotReply = (inputText) => {
    const lower = inputText.toLowerCase();

    if (awaitingContact) {
      return {
        sender: 'bot',
        text: `Thanks! An agent will contact you at ${inputText.trim()} shortly.`,
        timestamp: new Date(),
      };
    }

    if (
      lower.includes('hi') ||
      lower.includes('hello') ||
      lower.includes('hey')
    ) {
      return {
        sender: 'bot',
        text: 'Hello! 👋 Welcome to Corley Integrated Paralegals. How can I assist you with your legal needs today?',
        quickReplies: [
          'What services do you offer?',
          'How much does it cost?',
          'I need document preparation',
        ],
      };
    }

    if (
      lower.includes('services') ||
      lower.includes('offer') ||
      lower.includes('provide')
    ) {
      return {
        sender: 'bot',
        text: 'We offer various paralegal services including:\n\n• Document preparation (contracts, wills, power of attorney)\n• Legal research\n• Court filings\n• Contract review\n• Notary services\n\nIs there a specific service you need help with?',
        quickReplies: [
          'Document preparation',
          'Court filings',
          'Legal research',
        ],
      };
    }

    if (
      lower.includes('document') ||
      lower.includes('paperwork') ||
      lower.includes('forms')
    ) {
      return {
        sender: 'bot',
        text: 'We can assist with preparing legal documents such as:\n\n• Contracts\n• Wills and trusts\n• Divorce papers\n• Power of attorney\n• Court forms\n\nWould you like help with a specific document?',
        quickReplies: [
          'Divorce papers',
          'Power of attorney',
          'Contract review',
        ],
      };
    }

    if (
      lower.includes('cost') ||
      lower.includes('price') ||
      lower.includes('fee')
    ) {
      return {
        sender: 'bot',
        text: 'Our standard fees:\n\n• Document preparation: $150-$400\n• Court filings: $200-$500\n• Legal research: $75-$150/hour\n• Notary services: $15 per signature\n\nFor a precise quote, could you specify which service you need?',
        quickReplies: [
          'Document prep quote',
          'Court filing fees',
          'Consultation cost',
        ],
      };
    }

    if (
      lower.includes('time') ||
      lower.includes('long') ||
      lower.includes('duration')
    ) {
      return {
        sender: 'bot',
        text: 'Typical processing times:\n\n• Document prep: 1-3 business days\n• Court filings: 2-5 business days\n• Legal research: 3-7 business days\n• Urgent requests: +50% fee for 24hr turnaround\n\nWould you like to check availability?',
        quickReplies: [
          'Urgent request',
          'Standard timeline',
          'Check availability',
        ],
      };
    }

    if (
      lower.includes('court') ||
      lower.includes('filing') ||
      lower.includes('case')
    ) {
      return {
        sender: 'bot',
        text: 'We assist with court filings for:\n\n• Family law\n• Small claims\n• Probate\n• Civil matters\n\nNote: We are not attorneys but can help prepare and file documents. Would you like more details?',
        quickReplies: [
          'Family law filings',
          'Small claims help',
          'Probate documents',
        ],
      };
    }

    if (
      lower.includes('contact') ||
      lower.includes('phone') ||
      lower.includes('email')
    ) {
      return {
        sender: 'bot',
        text: 'Our contact information:\n\n📞 (555) 123-4567\n📧 help@corleyparalegals.com\n🏢 123 Legal Ave, Suite 100\n\nOffice hours: Mon-Fri 9am-5pm\n\nWould you like to speak with someone now?',
        showTransferButton: true,
      };
    }

    if (
      lower.includes('appointment') ||
      lower.includes('meeting') ||
      lower.includes('consult')
    ) {
      return {
        sender: 'bot',
        text: 'We offer:\n\n• In-person consultations\n• Phone consultations\n• Video meetings\n\nAvailable slots typically within 1-2 business days. Would you like me to check availability?',
        showTransferButton: true,
      };
    }

    if (
      lower.includes('agent') ||
      lower.includes('human') ||
      lower.includes('representative')
    ) {
      return {
        sender: 'bot',
        text: 'Would you like to speak with a live agent?',
        showTransferButton: true,
      };
    }

    const defaultResponses = [
      {
        text: "I'm not sure I understand. Could you rephrase your question?",
        quickReplies: [
          'What services do you offer?',
          'How much does it cost?',
          'I need document preparation',
        ],
      },
      {
        text: "I can help with general information about our paralegal services. For specific legal advice, you'll need to consult an attorney.",
        quickReplies: [
          'Find an attorney',
          'Paralegal services',
          'Legal research',
        ],
      },
      {
        text: "That's an interesting question. Our team specializes in document preparation and legal support services. How can I assist you?",
        showTransferButton: true,
      },
    ];

    return {
      sender: 'bot',
      ...defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
    };
  };

  const handleTransfer = async () => {
    setIsTransferring(true);
    setAwaitingContact(true);
    const transferMessage = {
      sender: 'bot',
      text: 'Please share your contact info (phone/email) so an agent can reach you:',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, transferMessage]);
    await supabase.from('chat_sessions').insert([
      {
        session_id: sessionId,
        sender: 'bot',
        text: transferMessage.text,
      },
    ]);
    await supabase.from('chat_metadata').upsert([
      {
        session_id: sessionId,
        transferred: true,
        status: 'pending',
      },
    ]);
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed bottom-20 right-6 bg-white border border-gray-200 rounded-2xl shadow-2xl w-96 h-[32rem] z-50 flex flex-col overflow-hidden font-sans"
      >
        {/* Connection indicator */}
        <div
          className={`absolute top-3 right-3 w-2 h-2 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}
          title={isConnected ? 'Connected' : 'Disconnected'}
        />

        {/* Header */}
        <div className="bg-gradient-to-r from-pink-200 to-blue-300 text-gray-800 p-4 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-full">
              <FaRobot className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <h3 className="font-semibold">
                {isTransferring
                  ? 'Connecting to agent...'
                  : 'Corley Paralegals'}
              </h3>
              <p className="text-xs opacity-80">
                {isTransferring ? 'Please wait...' : 'Virtual Assistant'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.setItem(
                `${SESSION_KEY}_messages`,
                JSON.stringify(messages)
              );
              onClose();
            }}
            className="text-gray-600 hover:text-gray-800"
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
                    {msg.quickReplies && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.quickReplies.map((reply, i) => (
                          <button
                            key={i}
                            onClick={() => setInput(reply)}
                            className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
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

                {msg.sender === 'user' && (
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <FiUser className="w-5 h-5 text-blue-500" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-3 justify-start">
                <div className="bg-pink-100 p-2 rounded-full flex-shrink-0 shadow-sm">
                  <FaRobot className="w-5 h-5 text-pink-500" />
                </div>
                <div className="bg-white text-gray-800 p-4 rounded-2xl rounded-bl-none shadow-sm text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

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
                awaitingContact ? 'Your phone/email...' : 'Type your message...'
              }
              className="flex-1 p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
            />
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-xl transition-colors"
            >
              <FiSend size={18} />
            </button>
          </form>
          <div className="mt-3 flex justify-center">
            <button
              onClick={async () => {
                await supabase
                  .from('chat_metadata')
                  .update({ status: 'completed' })
                  .eq('session_id', sessionId);
                localStorage.removeItem(SESSION_KEY);
                setMessages([
                  {
                    sender: 'bot',
                    text: 'Session ended. Feel free to start a new chat anytime.',
                    timestamp: new Date(),
                  },
                ]);
                setIsTransferring(false);
                setAwaitingContact(false);
                setInput('');
              }}
              className="text-xs text-red-500 hover:underline"
            >
              End Session
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {isTransferring
              ? 'Connecting you to an agent...'
              : 'We value your privacy. Your information is secure.'}
          </p>
        </div>
      </motion.div>
    </>
  );
}
