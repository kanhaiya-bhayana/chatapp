import React from 'react';
import { LogOut, User } from 'lucide-react';

interface OnlineUser {
  id: number;
  nickname: string;
  isCurrentUser: boolean;
}

interface OnlineUsersProps {
  users: OnlineUser[];
  currentUser: { nickname: string; realName: string };
  onLogout: () => void;
}

const OnlineUsers: React.FC<OnlineUsersProps> = ({ users, currentUser, onLogout }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-blue-600">
        <h2 className="text-xl font-bold mb-2">Online Users</h2>
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="flex items-center">
              <div className="relative mr-2">
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-500"></div>
              </div>
              <span>{user.nickname} {user.isCurrentUser && '(You)'}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-4">
        <div className="mb-2 text-sm">
          <p>Connected user</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center text-white hover:text-blue-200 transition duration-200"
        >
          <LogOut size={16} className="mr-1" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default OnlineUsers;