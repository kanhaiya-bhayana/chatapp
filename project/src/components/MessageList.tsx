import React from 'react';

interface Message {
  text: string;
  sender: string;
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  currentUser: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>No messages yet. Start a conversation!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message, index) => {
        const isCurrentUser = message.sender === currentUser;
        
        return (
          <div
            key={index}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                isCurrentUser
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {!isCurrentUser && (
                <div className="text-xs font-bold mb-1">{message.sender}</div>
              )}
              <p>{message.text}</p>
              <div className="text-xs opacity-70 text-right mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;