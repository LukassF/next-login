import { decodedTokenNoReq } from "@/utils/decodeTokenNoRequest";

const Message = ({
  message,
  currentUserId,
}: {
  message: chatsProps;
  currentUserId: number;
}) => {
  return (
    <div
      className={`py-1 px-4 max-w-1/3 break-all text-slate-100 rounded-xl ${
        currentUserId == message.user_id
          ? "self-end bg-slate-800"
          : "bg-slate-500"
      }`}
    >
      {message.msg}{" "}
      <span className="text-xs">
        {new Date(message.date).getHours()}:
        {new Date(message.date).getMinutes()}
      </span>
    </div>
  );
};

export default Message;
