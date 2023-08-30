"use client";

import Link from "next/link";
import { useEffect, useState, useRef, FC } from "react";
import axios from "axios";
import ChatPage from "@/components/chat/ChatPage";
import AsideChats from "@/components/addingUsers/AsideChats";

export default function Home() {
  const [currentUser, setCurrentUser] = useState<currentUser>();
  const [selectedChat, setSelectedChat] = useState<chat>();
  const [helper, setHelper] = useState<chat[]>();
  const asideChatsRef = useRef<any>(null);

  useEffect(() => {
    axios
      .get("/api/chats/getchats")
      .then((chats) => {
        setHelper(chats.data.chats);
        setCurrentUser(chats.data.currentUser);
      })
      .then(() => {
        if (asideChatsRef.current) console.log(asideChatsRef);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (asideChatsRef.current)
      asideChatsRef.current.changeAvailableChats(helper);
  }, [helper]);

  // useEffect(() => {
  //   console.log(selectedChat);
  // }, [selectedChat]);

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

        {currentUser && (
          <AsideChats
            ref={asideChatsRef}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            currentUser={currentUser}
          />
        )}

        <div>
          {selectedChat && currentUser && (
            <ChatPage
              selectedChat={selectedChat}
              currentUserId={currentUser.id}
            />
          )}
        </div>
      </section>
    </main>
  );
}
