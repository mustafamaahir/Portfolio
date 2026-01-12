import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader, Sparkles, Trash2 } from 'lucide-react';
import { sendChatMessage, getSuggestedQuestions } from '../services/api';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const questions = await getSuggestedQuestions();
        setSuggestedQuestions(questions);
      } catch (error) {
        console.error('Failed to load suggestions:', error);
      }
    };
    loadSuggestions();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (messageText = null) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend || isLoading) return;

    const userMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const history = messages.map(msg => ({ role: msg.role, content: msg.content }));
      const response = await sendChatMessage(textToSend, history);
      
      const aiMessage = { 
        role: 'assistant', 
        content: response.response,
        timestamp: response.timestamp
      };
      setMessages(prev => [...prev, aiMessage]);

      if (response.suggested_questions && messages.length === 0) {
        setSuggestedQuestions(response.suggested_questions);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message || 'Failed to send message. Please try again.');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or check your connection.',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };

  const clearConversation = () => {
    if (window.confirm('Clear all messages?')) {
      setMessages([]);
      setError(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-110 flex items-center justify-center ${
          isOpen ? 'rotate-90' : ''
        }`}
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-ping opacity-75"></div>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-md h-[600px] bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Assistant</h3>
                  <p className="text-xs text-gray-300">Ask me anything about my portfolio</p>
                </div>
              </div>
              <button
                onClick={clearConversation}
                className="p-2 hover:bg-gray-800 rounded-lg transition"
                title="Clear conversation"
                disabled={messages.length === 0}
              >
                <Trash2 size={18} className={messages.length === 0 ? 'text-gray-600' : 'text-gray-400'} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-950">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={32} />
                </div>
                <h4 className="text-lg font-semibold mb-2">Hi! I'm your AI assistant</h4>
                <p className="text-gray-400 text-sm mb-6">
                  I can help you learn about my skills, projects, and experience. Try asking:
                </p>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="w-full text-left px-4 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-purple-500/50 rounded-lg text-sm transition"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : message.isError
                      ? 'bg-red-900/30 border border-red-500/50 text-red-200'
                      : 'bg-gray-900 border border-gray-800 text-gray-200'
                  }`}>
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-900 border border-gray-800 px-4 py-3 rounded-2xl flex items-center gap-2">
                  <Loader size={16} className="animate-spin" />
                  <span className="text-gray-400 text-sm">Thinking...</span>
                </div>
              </div>
            )}

            {error && !isLoading && (
              <div className="text-center py-2">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-800 bg-gray-900">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg transition flex items-center justify-center"
              >
                {isLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by Groq AI • Press Enter to send
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;