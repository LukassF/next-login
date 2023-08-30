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
    chat_id: 1,
    username: currentUser.data.username,
    email: currentUser.data.email,
  });
}
