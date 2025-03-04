import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (nickname: string, realName: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [nickname, setNickname] = useState('');
  const [realName, setRealName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim() && realName.trim()) {
      onLogin(nickname, realName);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Enter Chatroom</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
            Nickname:
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="realName" className="block text-sm font-medium text-gray-700 mb-1">
            Real Name:
          </label>
          <input
            type="text"
            id="realName"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Enter Chatroom
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;