"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ChatLog from "./ChatLog";
import Form from "./Form";

const ChatPage = ({
  selectedChat,
  setSelectedChat,
  currentUserId,
}: {
  selectedChat: chat;
  setSelectedChat: (value: any) => any;
  currentUserId: number;
}) => {
  const [messages, setMessages] = useState<chatsProps[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const userNumber = currentUserId === selectedChat.user_id_1 ? "1" : "2";
  const interlocutorCredentials = {
    name: userNumber === "1" ? selectedChat.name2 : selectedChat.name1,
    email: userNumber === "1" ? selectedChat.email2 : selectedChat.email1,
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/chats/getmessages/${selectedChat.id}`)
      .then((res) => setMessages(res.data.messages))
      .finally(() => setLoading(false));
  }, [selectedChat]);

  return (
    <main className="flex flex-1 h-full flex-col items-center justify-start bg-slate-200 rounded-2xl p-4 gap-4">
      <header className="w-full bg-slate-100 rounded-2xl h-20 shadow-md z-20 p-4 flex items-center gap-4">
        <div className="h-full aspect-square bg-indigo-900 rounded-full text-slate-100 font-semibold text-2xl flex justify-center items-center relative">
          <div className="bg-green-700 w-4 aspect-square rounded-full absolute right-0 bottom-0"></div>
          {interlocutorCredentials.name.slice(0, 1).toUpperCase()}
        </div>

        <span className="text-2xl font-bold">
          {interlocutorCredentials.name}
        </span>
        <span className="text-sm">{interlocutorCredentials.email}</span>

        <button className="ml-auto text-2xl text-slate-600">
          <i className="fa fa-cogs"></i>
        </button>
        <button
          className="text-3xl text-slate-600"
          onClick={() => setSelectedChat(undefined)}
        >
          <i className="fa fa-close"></i>
        </button>
      </header>
      {currentUserId && (
        <div className="flex-1 w-full rounded-2xl overflow-hidden">
          <ChatLog
            messages={messages}
            currentUserId={currentUserId}
            loading={loading}
            selectedChat={selectedChat}
            interlocutor={interlocutorCredentials}
          />
          <Form selectedChat={selectedChat.id} />
        </div>
      )}
    </main>
  );
};

export default ChatPage;
