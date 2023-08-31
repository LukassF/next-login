"use client";

import Link from "next/link";
import { useEffect, useState, useRef, FC, useCallback } from "react";
import axios from "axios";
import ChatPage from "@/components/chat/ChatPage";
import AsideChats from "@/components/addingUsers/AsideChats";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<currentUser>();
  const [selectedChat, setSelectedChat] = useState<chat>();
  const [loading, setLoading] = useState(false);
  const [helper, setHelper] = useState<chat[]>();
  const asideChatsRef = useRef<any>(null);

  const logout = useCallback(async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/chats/getchats")
      .then((chats) => {
        setHelper(chats.data.chats);
        setCurrentUser(chats.data.currentUser);
      })
      .then(() => {
        if (asideChatsRef.current) console.log(asideChatsRef);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (asideChatsRef.current)
      asideChatsRef.current.changeAvailableChats(helper);
  }, [helper]);

  return (
    <main className="h-screen bg-cover bg-center bg-[url('https://wallpaper.dog/large/17027482.jpg')] p-8 px-12 flex items-stretch">
      <section className="min-w-full rounded-2xl overflow-hidden flex gap-2">
        <nav className="bg-slate-100 p-4 min-w-100 flex flex-col justify-between items-center rounded-2xl">
          <Link
            key={Math.random()}
            href={"/login"}
            className="aspect-square w-full bg-slate-600 rounded-full text-2xl text-slate-100 font-bold items-center flex justify-center"
          >
            {currentUser?.username.slice(0, 1).toUpperCase()}
          </Link>
          <button
            onClick={logout}
            className="w-full aspect-square text-3xl text-stone-600"
          >
            <i className="fa fa-sign-out"></i>
          </button>
        </nav>

        {currentUser &&
          (loading ? (
            <div>Loading...</div>
          ) : (
            <AsideChats
              ref={asideChatsRef}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              currentUser={currentUser}
            />
          ))}

        <div className="flex-initial w-7/10 bg-slate-200 rounded-2xl overlow-hidden">
          {selectedChat && currentUser && (
            <ChatPage
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              currentUserId={currentUser.id}
            />
          )}
        </div>
      </section>
    </main>
  );
}
