import React, { useEffect, useRef, useState } from "react";
import { Send, LogOut } from "lucide-react";
import SockJS from "sockjs-client";
import OnlineUsers from "./OnlineUsers";
import MessageList from "./MessageList";
import { Client } from "@stomp/stompjs";

interface User {
  nickname: string;
  realName: string;
}

interface ChatRoomProps {
  user: User;
  onLogout: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ user, onLogout }) => {
  const stompClientRef = useRef<Client | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { text: string; sender: string; timestamp: Date }[]
  >([]);
  const [onlineUsers, setOnlineUsers] = useState<
    { id: number; nickname: string; isCurrentUser: boolean }[]
  >([{ id: 1, nickname: user.nickname, isCurrentUser: true }]);

  function onConnected() {
    if (stompClientRef.current == null) return;

    // Subscribe to private and public messages
    stompClientRef.current.subscribe(
      `/user/${user.nickname}/queue/messages`,
      onMessageReceived
    );
    stompClientRef.current.subscribe(`/user/public`, onMessageReceived);

    // Register the connected user
    stompClientRef.current.publish({
      destination: "app/user.addUser",
      body: JSON.stringify({
        payload: {
          nickName: user.nickname,
          fullName: user.realName,
          status: "ONLINE",
        },
      }),
    });

    // Fetch and display the connected users
    findAndDisplayConnectedUsers();
  }

  // async function findAndDisplayConnectedUsers() {
  //   try {
  //     const connectedUserResponse: Response = await fetch("/users");
  //     let connectedUsers: { nickname: string }[] =
  //       await connectedUserResponse.json();

  //     // Filter out the current user and assign IDs
  //     connectedUsers = connectedUsers
  //       .filter((u) => u.nickname !== user.nickname)
  //       .map((u, index) => ({
  //         id: index + 2, // Start IDs from 2 (1 is reserved for the current user)
  //         nickname: u.nickname,
  //         isCurrentUser: false,
  //       }));

  //     // Include the current user and update the state
  //     setOnlineUsers([
  //       { id: 1, nickname: user.nickname, isCurrentUser: true },
  //       ...connectedUsers,
  //     ]);
  //   } catch (error) {
  //     console.error("Failed to fetch connected users:", error);
  //   }
  // }

  async function findAndDisplayConnectedUsers() {
    try {
      const connectedUserResponse: Response = await fetch("/users");
      let connectedUsers: { nickname: string }[] = await connectedUserResponse.json();
  
      // Transform connectedUsers to match the expected structure
      const transformedUsers = connectedUsers
        .filter((u) => u.nickname !== user.nickname) // Exclude the current user
        .map((u, index) => ({
          id: index + 2, // Assign unique IDs starting from 2
          nickname: u.nickname,
          isCurrentUser: false, // Mark them as not the current user
        }));
  
      // Include the current user and update the state
      setOnlineUsers([
        { id: 1, nickname: user.nickname, isCurrentUser: true },
        ...transformedUsers,
      ]);
    } catch (error) {
      console.error("Failed to fetch connected users:", error);
    }
  }
  

  function onMessageReceived(message: any) {
    // Handle incoming messages (implement as needed)
    console.log("Message received:", message);
  }

  useEffect(() => {
    const socket = new SockJS("");
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
    });
    client.onConnect = onConnected;
    client.activate();
    stompClientRef.current = client;

    // Cleanup function to deactivate the client
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []); // Run only once when the component mounts

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        { text: message, sender: user.nickname, timestamp: new Date() },
      ]);
      setMessage("");
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
        <form
          onSubmit={handleSendMessage}
          className="border-t border-gray-200 p-4 flex"
        >
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
