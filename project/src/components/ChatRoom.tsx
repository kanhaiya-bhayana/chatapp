import React, { useState } from 'react';
import { Send, LogOut } from 'lucide-react';
import OnlineUsers from './OnlineUsers';
import MessageList from './MessageList';

interface User {
  nickname: string;
  realName: string;
}

interface ChatRoomProps {
  user: User;
  onLogout: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ user, onLogout }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: string; timestamp: Date }[]>([]);
  
  // Mock online users
  const onlineUsers = [
    { id: 1, nickname: user.nickname, isCurrentUser: true },
    { id: 2, nickname: 'User 1', isCurrentUser: false },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        { text: message, sender: user.nickname, timestamp: new Date() }
      ]);
      setMessage('');
    }
  };

  return (
    <div className="flex h-[600px] w-full max-w-6xl rounded-lg overflow-hidden shadow-lg">
      {/* Online Users Sidebar */}
      <div className="w-1/4 bg-blue-500 text-white">
        <OnlineUsers users={onlineUsers} currentUser={user} onLogout={onLogout} />
      </div>
      
      {/* Chat Area */}
      <div className="w-3/4 bg-white flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <MessageList messages={messages} currentUser={user.nickname} />
        </div>
        
        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition duration-200"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;