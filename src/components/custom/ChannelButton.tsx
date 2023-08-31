import React, { useMemo } from "react";

interface ChannelButtonProps {
  selectedChat: chat;
  chat: chat;
  username: string;
  email: string;
  setSelectedChat: (value: chat) => any;
  hasSeen: boolean;
}

const ChannelButton = ({
  selectedChat,
  chat,
  username,
  email,
  setSelectedChat,
  hasSeen,
}: ChannelButtonProps) => {
  const isSelected = useMemo(() => {
    return selectedChat && selectedChat.id == chat.id;
  }, [selectedChat, chat]);
  return (
    <button
      key={chat.id}
      onClick={() => setSelectedChat(chat)}
      className={` w-full bg-slate-600 min-h-50px p-2 flex justify-start items-center gap-3 rounded-full bg-opacity-10 ${
        hasSeen ? "text-stone-600" : "text-stone-900 font-extrabold"
      } `}
    >
      <div
        className={`h-full aspect-square items-center flex justify-center relative ${
          isSelected ? "bg-indigo-900" : "bg-slate-600 "
        } rounded-full text-slate-200`}
      >
        <div className="bg-green-700 w-3 aspect-square rounded-full absolute right-0 bottom-0"></div>
        {username.slice(0, 1).toUpperCase()}
      </div>
      <div className="flex flex-col items-start justify-around">
        <span
          className={` ${
            isSelected ? "text-indigo-900" : "text-slate-600 "
          }  font-semibold`}
        >
          {username}
        </span>
        <span className="text-xs font-normal text-slate-600">{email}</span>
      </div>

      {!hasSeen && (
        <h6 className="ml-auto text-10px font-bold h-3/4 aspect-square bg-amber-500 bg-opacity-50 text-lg font-bold rounded-full text-slate-200">
          !
        </h6>
      )}
    </button>
  );
};

export default ChannelButton;
