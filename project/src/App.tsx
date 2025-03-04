import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import LoginScreen from './components/LoginScreen';
import ChatRoom from './components/ChatRoom';

function App() {
  const [user, setUser] = useState<{ nickname: string; realName: string } | null>(null);
  
  const handleLogin = (nickname: string, realName: string) => {
    setUser({ nickname, realName });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex items-center">
          <MessageSquare className="text-blue-600 mr-2" size={24} />
          <h1 className='text-xl font-bold'>title</h1>
          {/* <h1 className="text-xl font-bold">One to One Chat | Spring boot & Websocket | By Kanhaiya</h1> */}
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-4 flex items-center justify-center">
        {!user ? (
          <LoginScreen onLogin={handleLogin} />
        ) : (
          <ChatRoom user={user} onLogout={handleLogout} />
        )}
      </main>
    </div>
  );
}

export default App;