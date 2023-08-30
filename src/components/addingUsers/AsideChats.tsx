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
      setAvailableChats((prev) => [...prev, data]);
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
    <aside className="w-1/3 bg-slate-400">
      <div className="flex flex-col">
        {availableChats &&
          availableChats.map((chat) => {
            const { email, username } = determineUser(chat);

            const hasSeen = newHasSeen.includes(chat.id.toString());

            return (
              <button
                onClick={() => props.setSelectedChat(chat)}
                className={`${
                  hasSeen ? "text-stone-600" : "text-stone-900 font-extrabold"
                }`}
              >
                {username} {email}
              </button>
            );
          })}
      </div>
      <AddForm />
    </aside>
  );
});

export default AsideChats;
