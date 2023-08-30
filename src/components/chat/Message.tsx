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
      className={`py-1 px-4  text-slate-100 rounded-xl ${
        currentUserId == message.user_id
          ? "self-end bg-slate-800"
          : "bg-slate-500"
      }`}
    >
      {message.msg}
    </div>
  );
};

export default Message;
