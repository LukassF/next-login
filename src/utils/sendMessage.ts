"use server";

import { sql } from "@vercel/postgres";
import { decodedTokenNoReq } from "./decodeTokenNoRequest";

export async function sendMessage({
  formData,
  chatId,
}: {
  formData: FormData;
  chatId: number;
}) {
  "use server";
  const Pusher = require("pusher");

  const message = formData.get("message");

  if ((message as string).length === 0) return;

  const currentUser: any = decodedTokenNoReq();
  const dateNow = new Date();
  await sql`INSERT INTO messages(Message, User_ID, Date,Chat_id) VALUES (${
    message as any
  }, ${currentUser.data.id}, ${dateNow as any},${chatId})`;

  const currentChat = await sql`SELECT * FROM chats WHERE chats.Id=${chatId}`;

  const userNumber =
    currentChat.rows[0].user_id_1 == currentUser.data.id ? "1" : "2";

  userNumber === "1"
    ? await sql`UPDATE chats SET user2_seen='0' WHERE chats.Id=${chatId}`
    : await sql`UPDATE chats SET user1_seen='0' WHERE chats.Id=${chatId}`;

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true,
  });

  pusher.trigger("chat", "message", {
    msg: message,
    date: dateNow,
    user_id: currentUser.data.id,
    chat_id: chatId,
    username: currentUser.data.username,
    email: currentUser.data.email,
  });

  pusher.trigger("hasSeen", "toggleSeen", {
    chatId: chatId.toString(),
    user: userNumber === "1" ? "2" : "1",
    seen: false,
  });
}
