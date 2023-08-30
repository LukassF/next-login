"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import ChatPage from "@/components/chat/ChatPage";

export default function Home() {
  const [availableChats, setAvailableChats] = useState<chat[]>();
  const [currentUserId, setCurrentUserId] = useState<number>();
  const [selectedChat, setSelectedChat] = useState<chat>();
  useEffect(() => {
    axios
      .get("/api/chats/getchats")
      .then((chats) => {
        setAvailableChats(chats.data.chats);
        setCurrentUserId(chats.data.currentUserId);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="min-h-screen bg-cover bg-center bg-[url('https://wallpaper.dog/large/17027482.jpg')] p-8 flex items-stretch">
      <section className="bg-slate-300 min-w-full rounded-xl p-5">
        <nav className="flex flex-col">
          <Link key={Math.random()} href={"/signup"}>
            Sign Up
          </Link>
          <Link key={Math.random()} href={"/login"}>
            Log In
          </Link>
        </nav>
        <div className="flex flex-col">
          {availableChats &&
            availableChats.map((chat) => (
              <button onClick={() => setSelectedChat(chat)}>
                {chat.user_id_1} - {chat.user_id_2}
              </button>
            ))}
        </div>

        <div>
          {selectedChat && currentUserId && (
            <ChatPage
              selectedChat={selectedChat}
              currentUserId={currentUserId}
            />
          )}
        </div>
      </section>
    </main>
  );
}
