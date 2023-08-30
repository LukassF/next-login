"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ChatLog from "./ChatLog";
import Form from "./Form";

const ChatPage = ({
  selectedChat,
  currentUserId,
}: {
  selectedChat: chat;
  currentUserId: number;
}) => {
  const [messages, setMessages] = useState<chatsProps[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/chats/getmessages/${selectedChat.id}`)
      .then((res) => setMessages(res.data.messages))
      .finally(() => setLoading(false));
  }, [selectedChat]);

  // useEffect(() => {

  // },[])

  return (
    <main className="flex flex-col items-center justify-start mt-10">
      {messages && currentUserId && (
        <div>
          <ChatLog
            messages={messages}
            currentUserId={currentUserId}
            loading={loading}
            selectedChat={selectedChat}
          />
          <Form selectedChat={selectedChat.id} />
        </div>
      )}
    </main>
  );
};

export default ChatPage;
