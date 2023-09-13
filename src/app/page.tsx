"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
  useRef,
  FC,
  useCallback,
  useLayoutEffect,
} from "react";
import axios from "axios";
import ChatPage from "@/components/chat/ChatPage";
import AsideChats from "@/components/addingUsers/AsideChats";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Watch } from "react-loader-spinner";
import Loader from "@/components/custom/Loader";

export default function Home() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<currentUser>();
  const [currentUserStats, setCurrentUserStats] = useState<{
    numchats: string;
    nummessages: string;
  }>({ numchats: "0", nummessages: "0" });
  const [selectedChat, setSelectedChat] = useState<chat>();
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogOutLoading] = useState(false);
  const [helper, setHelper] = useState<chat[]>();
  const asideChatsRef = useRef<any>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    show: boolean;
  }>();

  const logout = useCallback(async () => {
    setLogOutLoading(true);
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      router.push("/");
      window.location.reload();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLogOutLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      .catch((err) => {
        console.log(err);
        router.push("/login");
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    axios
      .get("/api/users/current")
      .then((userResponse) => setCurrentUserStats(userResponse.data.user))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (asideChatsRef.current)
      asideChatsRef.current.changeAvailableChats(helper);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [helper]);

  if (loading) return <Loader />;

  return (
    <>
      {tooltip?.show && (
        <div
          className="fixed bg-slate-600 text-sm p-3 rounded-xl text-slate-50"
          style={{
            left: tooltip.x + 20 + "px",
            top: tooltip.y + 20 + "px",
            zIndex: 100,
          }}
        >
          <div className="flex justify-between items-center gap-6">
            <span className="font-normal">Username</span>
            <span className="font-light text-slate-300">
              {" "}
              {currentUser?.username}
            </span>
          </div>
          <div className="flex justify-between items-center gap-6">
            <span className="font-normal">Email</span>
            <span className="font-light  text-slate-300">
              {currentUser?.email}
            </span>
          </div>
        </div>
      )}
      <main className="h-screen bg-cover w-screen bg-center bg-[url('https://wallpaper.dog/large/17027482.jpg')] py-0 px-0 sm:py-6 sm:px-4 lg:px-6 flex items-stretch">
        <section className="min-w-full sm:rounded-2xl overflow-hidden grid grid-rows-phone xs:grid-rows-1 grid-cols-phone xs:grid-cols-small md:grid-cols-medium lg:grid-cols-main sm:gap-2">
          <nav className="h-full w-full flex justify-between xs:flex-col bg-slate-100 items-center sm:rounded-2xl px-4 py-2 xs:py-4">
            <div
              onMouseMove={(e) =>
                setTooltip({ x: e.clientX, y: e.clientY, show: true })
              }
              onMouseLeave={() => setTooltip({ x: 0, y: 0, show: false })}
              className="cursor-default h-full xs:w-full sm:w-3/4 md:w-full xl:w-3/4 xs:h-auto aspect-square relative  bg-slate-600 rounded-full text-xl xs:text-2xl text-slate-100 font-bold items-center flex justify-center"
            >
              {currentUser?.username.slice(0, 1).toUpperCase()}
            </div>
            <div className="flex justify-center gap-2 text-stone-600 items-center w-full xs:mt-10 text-md xs:text-xl">
              <i className="fa fa-message text-xl sm:text-2xl"></i>
              {currentUserStats.nummessages}
            </div>
            <div className="flex justify-center gap-2 text-stone-600 items-center w-full text-md xs:text-xl xs:mt-3">
              <i className="fa fa-people-group text-xl sm:text-2xl"></i>
              {currentUserStats.numchats}
            </div>

            <button
              onClick={logout}
              className="h-full mt-auto xs:w-full xs:h-auto aspect-square text-3xl text-stone-600 relative flex justify-center items-center"
            >
              {logoutLoading ? (
                <Watch
                  height="30"
                  width="30"
                  radius="48"
                  color="#57534E"
                  ariaLabel="watch-loading"
                />
              ) : (
                <i className="fa fa-sign-out"></i>
              )}
            </button>
          </nav>

          {currentUser && (
            <AsideChats
              ref={asideChatsRef}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              currentUser={currentUser}
            />
          )}

          {/* <div className="h-full w-full bg-rose-200"></div> */}

          {currentUser &&
            (selectedChat ? (
              <ChatPage
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                currentUserId={currentUser.id}
              />
            ) : (
              <div className="hidden md:block h-full w-full bg-cover bg-center overflow-hidden bg-[url('https://t3.ftcdn.net/jpg/04/07/01/16/360_F_407011689_Umf4nMU8bl4Lsr5mYd0x6Oo9UnvnIfoc.jpg')] rounded-2xl">
                <div className="w-full h-full backdrop-blur rounded-xl p-10 bg-gradient-to-b from-stone-500 via-transparent to-stone-500 flex flex-col gap-10">
                  <h1 className="text-7xl lg:text-8xl text-indigo-900 font-extrabold">
                    Text&apos;em
                  </h1>
                  <h3 className="text-4xl text-slate-100 font-bold">
                    Chat with friends and strangers alike!
                  </h3>
                  <h4 className="text-2xl text-slate-200 font-medium mt-auto">
                    Choose a chat from the menu on the left and create memories!
                  </h4>
                </div>
              </div>
            ))}
        </section>
      </main>
    </>
  );
}
