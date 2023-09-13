"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Message from "./Message";
import Pusher from "pusher-js";
import axios from "axios";
import { Watch } from "react-loader-spinner";
import Divider from "../custom/Divider";

const ChatLog = ({
  messages,
  currentUserId,
  loading,
  selectedChat,
  interlocutor,
}: {
  messages: Array<chatsProps> | undefined;
  currentUserId: number;
  loading: boolean;
  selectedChat: chat;
  interlocutor: { name: string; email: string };
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
      if (data.chat_id === selectedChat.id) setLogs((prev) => [...prev!, data]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, [selectedChat]);

  useEffect(() => {
    //sorting messages by date
    if (logs)
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
      <div className="w-full bg-slate-100 overflow-y-auto overflow-x-hidden flex flex-col justify-start items-start gap-1 px-5 py-8 h-full scrollbar-thin">
        <h1 className="text-center w-full font-bold text-xl lg:text-2xl">
          This is the start of a new chat with {interlocutor.name}.
        </h1>
        <p className="w-full lg:w-3/4 self-center text-center text-xs lg:text-sm mt-4 mb-20">
          Send messages below or wait for messages from {interlocutor.name}.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
          inventore eveniet sint aperiam iste. Dolore, incidunt repellendus? Eos
          at repellat dolore laudantium est distinctio voluptatem! Commodi
          voluptatem iusto ratione nobis.
        </p>
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <Watch
              height="50"
              width="50"
              radius="48"
              color="#312E81"
              ariaLabel="watch-loading"
            />
          </div>
        ) : (
          sortedLogs &&
          sortedLogs.map((message: chatsProps, i: number) => {
            const deltaTime =
              i + 1 < sortedLogs.length
                ? Math.round(
                    //@ts-ignore
                    new Date(sortedLogs[i + 1].date) - new Date(message.date)
                  ) /
                  1000 /
                  60
                : 0;

            return (
              <>
                {/* Initial Divider */}
                {i === 0 && <Divider date={message.date} margin="mb-10" />}

                <Message
                  message={message}
                  key={i}
                  currentUserId={currentUserId}
                  nextmessage={
                    i + 1 < sortedLogs.length ? sortedLogs[i + 1].user_id : 0
                  }
                  deltaTime={deltaTime}
                />

                {/* Divider */}
                {deltaTime > 10 && (
                  <Divider date={sortedLogs[i + 1].date} margin="my-10" />
                )}
              </>
            );
          })
        )}
        <div ref={messageEndRef}></div>
      </div>
    </>
  );
};

export default ChatLog;
