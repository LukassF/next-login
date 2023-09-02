"use client";

import {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import AddForm from "./AddForm";
import Pusher from "pusher-js";
import ChannelButton from "../custom/ChannelButton";
import toast from "react-hot-toast";

const AsideChats = forwardRef((props: any, ref) => {
  const [availableChats, setAvailableChats] = useState<chat[]>([]);
  const [newHasSeen, setNewHasSeen] = useState<string[]>([]);
  const [userNumber, setUserNumber] = useState<any>();

  useEffect(() => {
    availableChats.forEach((item) => {
      const userNumber = item.user_id_1 === props.currentUser.id ? "1" : "2";
      setUserNumber(userNumber);

      switch (userNumber) {
        case "1":
          if (item.user1_seen !== "0")
            setNewHasSeen((prev) => [...prev, item.id.toString()]);
          break;
        case "2":
          if (item.user2_seen !== "0")
            setNewHasSeen((prev) => [...prev, item.id.toString()]);
          break;
        default:
          break;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableChats, props.currentUser.id]);

  useImperativeHandle(ref, () => ({
    changeAvailableChats(data: chat[]) {
      setAvailableChats(data);
      // if (data[0]) props.setSelectedChat(data[0]);
    },
  }));

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: "eu",
    });

    var channel1 = pusher.subscribe("newFriend");
    channel1.bind("create", function (data: any) {
      if (data.error) toast.error(data.error);
      else setAvailableChats((prev) => [...prev, data]);
    });

    var channel2 = pusher.subscribe("hasSeen");
    channel2.bind("toggleSeen", function (data: any) {
      if (data.seen)
        setNewHasSeen((prev) => {
          if (!prev.find((item) => item == data.chatId))
            return [...prev, data.chatId];
          else return prev;
        });
      else if (
        !data.seen &&
        data.user == userNumber &&
        (!props.selectedChat ||
          props.selectedChat.id.toString() !== data.chatId)
      ) {
        setNewHasSeen((prev) => [
          ...prev.filter((item) => item != data.chatId),
        ]);
      }
    });

    return () => {
      pusher.unsubscribe("newFriend");
      pusher.unsubscribe("hasSeen");
    };
  }, [userNumber, props.selectedChat]);

  const determineUser = useCallback(
    (chat: chat) => {
      if (props.currentUser) {
        if (
          chat.email1 == props.currentUser.email &&
          chat.name1 == props.currentUser.username
        )
          return { email: chat.email2, username: chat.name2 };
        else if (
          chat.email2 == props.currentUser.email &&
          chat.name2 == props.currentUser.username
        )
          return { email: chat.email1, username: chat.name1 };
        else return { email: "", username: "" };
      } else {
        return { email: "", username: "" };
      }
    },
    [props.currentUser]
  );

  return (
    <aside
      className={`h-full w-full bg-slate-300 ${
        props.selectedChat ? "hidden" : "flex"
      } md:flex flex-col gap-5 px-4 py-6 sm:rounded-2xl`}
    >
      <AddForm />
      <hr className="bg-opacity-50"></hr>

      {/* fix scrollbar!!! */}
      <div className=" scrollbar flex flex-col gap-2 scroll-px-2 h-full overflow-y-auto scrollbar-track-blue-900 scrollbar-thin scroll-smooth">
        {availableChats && availableChats.length > 0 ? (
          availableChats.map((chat) => {
            const { email, username } = determineUser(chat);

            const hasSeen = newHasSeen.includes(chat.id.toString());

            return (
            
              <ChannelButton
                key={Math.random()}
                chat={chat}
                selectedChat={props.selectedChat}
                username={username}
                email={email}
                setSelectedChat={props.setSelectedChat}
                hasSeen={hasSeen}
              />
             
            );
          })
        ) : (
          <div>
            <h2 className="text-slate-600 font-bold text-center mb-3">
              No available chats
            </h2>
            <p className="text-xs text-slate-500 text-center px-5">
              Add friends with whom you want to talk, by typing their username
              or the email connected to their account, in the text field above.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
});

AsideChats.displayName = "AsideChats";
export default AsideChats;
