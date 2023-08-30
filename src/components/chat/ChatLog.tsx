"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Message from "./Message";
import Pusher from "pusher-js";

const ChatLog = ({
  messages,
  currentUserId,
}: {
  messages: Array<chatsProps>;
  currentUserId: number;
}) => {
  const [logs, setLogs] = useState(messages);
  const messageEndRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    setLogs(messages);
  }, [messages]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: "eu",
    });

    var channel = pusher.subscribe("chat");
    channel.bind("message", function (data: any) {
      setLogs((prev) => [...prev, data]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <>
      <div className="w-full bg-slate-100 h-96 overflow-auto flex flex-col justify-start items-start gap-1 p-2">
        {logs &&
          logs.map((message: chatsProps) => (
            <Message
              message={message}
              key={Math.random()}
              currentUserId={currentUserId}
            />
          ))}
        <div ref={messageEndRef}></div>
      </div>
    </>
  );
};

export default ChatLog;
