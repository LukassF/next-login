"use client";

import React, { useEffect, useState } from "react";
import Message from "./Message";
import Pusher from "pusher-js";

const ChatLog = ({
  chats,
  currentUserId,
}: {
  chats: Array<chatsProps>;
  currentUserId: number;
}) => {
  const [logs, setLogs] = useState(chats);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: "eu",
    });

    var channel = pusher.subscribe("chat");
    channel.bind("message", function (data: any) {
      setLogs((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div className="w-full bg-slate-300 h-96 overflow-auto flex flex-col justify-start items-start gap-1 p-2">
      {logs &&
        logs.map((message: chatsProps) => (
          <Message
            message={message}
            key={Math.random()}
            currentUserId={currentUserId}
          />
        ))}
    </div>
  );
};

export default ChatLog;
