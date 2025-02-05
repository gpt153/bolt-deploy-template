import React, { useState } from 'react';
import Message from './Message';

const query = async (data) => {
  const response = await fetch(
    "http://localhost:3000/api/v1/prediction/421dabab-9b52-40ee-8497-07c1be1f837b",
    {
      headers: {
        Authorization: "Bearer Hlej74TiWv5PCl9KsCN-mwEHOizBJDeKZpBoKJEXWzo",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    }
  );
  return response.json();
};

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { content: userMessage, isUser: true }]);

    try {
      const response = await query({ question: userMessage });
      setMessages(prev => [...prev, { content: response.text, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        content: "Sorry, there was an error processing your request.", 
        isUser: false 
      }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 max-w-4xl mx-auto w-full">
        {messages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>
      
      <div className="bg-white border-t">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
