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
    <main
      className={`max-h-full w-full bg-slate-200 sm:rounded-2xl overflow-hidden ${
        selectedChat ? "grid" : "hidden"
      } md:grid grid-rows-chat p-4 gap-5`}
    >
      <header className="w-full bg-slate-100 rounded-2xl h-full shadow-md z-20 p-4 flex items-center gap-2 lg:gap-4">
        <div className="h-2/3 sm:h-full aspect-square bg-indigo-900 rounded-full text-slate-100 font-semibold text-2xl flex justify-center items-center relative">
          <div className="bg-green-700 w-4 aspect-square rounded-full absolute right-0 bottom-0"></div>
          {interlocutorCredentials.name.slice(0, 1).toUpperCase()}
        </div>

        <span className="text-xl sm:text-2xl font-bold truncate max-w-100px lg:max-w-1/5">
          {interlocutorCredentials.name}ewdd
        </span>
        <span className="text-sm truncate max-w-100px lg:max-w-1/5">
          {interlocutorCredentials.email}
        </span>

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
        <div className="h-full w-full rounded-2xl overflow-hidden shadow-md relative grid grid-rows-chatlog">
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
