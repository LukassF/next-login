"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Message from "./Message";
import Pusher from "pusher-js";
import axios from "axios";

const ChatLog = ({
  messages,
  currentUserId,
  loading,
  selectedChat,
}: {
  messages: Array<chatsProps>;
  currentUserId: number;
  loading: boolean;
  selectedChat: chat;
}) => {
  const [logs, setLogs] = useState(messages);
  const [sortedLogs, setSortedLogs] = useState<chatsProps[]>();
  const messageEndRef = useRef<HTMLInputElement>(null);

  window.onbeforeunload = async function () {
    await axios.get(`/api/chats/getmessages/${selectedChat.id}`);
  };

  useLayoutEffect(() => {
    setLogs(messages);
  }, [messages]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: "eu",
    });

    var channel = pusher.subscribe("chat");
    channel.bind("message", function (data: any) {
      if (data.chat_id === selectedChat.id) setLogs((prev) => [...prev, data]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, [selectedChat]);

  useEffect(() => {
    //sorting messages by date
    setSortedLogs(
      logs.sort(function (a, b) {
        //@ts-ignore
        return new Date(a.date) - new Date(b.date);
      })
    );
  }, [logs]);

  useEffect(() => {
    //scrolling to the bottom of the convo
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sortedLogs]);

  return (
    <>
      <div className="w-full bg-slate-100 h-96 overflow-auto flex flex-col justify-start items-start gap-1 p-2">
        {loading ? (
          <div>Loading...</div>
        ) : (
          sortedLogs &&
          sortedLogs.map((message: chatsProps) => (
            <Message
              message={message}
              key={Math.random()}
              currentUserId={currentUserId}
            />
          ))
        )}
        <div ref={messageEndRef}></div>
      </div>
    </>
  );
};

export default ChatLog;
