const Message = ({
  message,
  currentUserId,
  nextmessage,
  deltaTime,
}: {
  message: chatsProps;
  currentUserId: number;
  nextmessage: number;
  deltaTime: number;
}) => {
  const isMine = currentUserId == message.user_id;
  const isNextElse = nextmessage !== message.user_id || deltaTime > 10;
  const timezoneOffset = new Date(message.date).getTimezoneOffset();

  return (
    <div
      tabIndex={0}
      className={`lg:max-w-1/3 flex justify-center items-end gap-3 group focus:mb-10 transition-all duration-300 cursor-default relative ${
        isMine ? "self-end" : ""
      } ${
        nextmessage !== message.user_id ? (deltaTime > 10 ? "" : "mb-10") : ""
      }`}
    >
      {!isMine && (
        <div
          className={`h-8 aspect-square bg-indigo-900 rounded-full text-slate-100 flex justify-center items-center text-sm ${
            !isNextElse && "opacity-0"
          }`}
        >
          {message.username.slice(0, 1).toUpperCase()}
        </div>
      )}
      <div
        className={`flex-1  px-4 py-2 text-slate-100 text-lg rounded-2xl break-all relative ${
          isMine ? "bg-slate-800" : "bg-slate-500"
        } `}
      >
        {message.msg}
      </div>
      {isMine && (
        <div
          className={`h-8 aspect-square bg-indigo-900 rounded-full text-slate-100 flex justify-center items-center text-sm ${
            !isNextElse && "opacity-0"
          }`}
        >
          {message.username.slice(0, 1).toUpperCase()}
        </div>
      )}

      <span
        className={`text-sm absolute opacity-0 group-focus:opacity-100 transition-all duration-300 ${
          isMine ? "right-14" : "left-14"
        } -bottom-5 text-slate-600 font-bold`}
      >
        {/* {(new Date(message.date).getHours() + timezoneOffset / 60 > 24
          ? new Date(message.date).getHours() + timezoneOffset / 60 - 24
          : new Date(message.date).getHours() + timezoneOffset / 60 < 0
          ? new Date(message.date).getHours() + timezoneOffset / 60 + 24
          : new Date(message.date).getHours() + timezoneOffset / 60
        )
          .toString()
          .padStart(2, "0")} */}
        {new Date(message.date).getHours().toString().padStart(2, "0")}:
        {new Date(message.date).getMinutes().toString().padStart(2, "0")}
      </span>
    </div>
  );
};

export default Message;
