"use server";

import { sql } from "@vercel/postgres";
import { decodedTokenNoReq } from "./decodeTokenNoRequest";

export async function createChat(data: FormData) {
  "use server";
  const Pusher = require("pusher");

  const user = data.get("user");

  if ((user as string).length === 0) return;

  const currentUser: any = decodedTokenNoReq();

  const foundUser = await sql`SELECT (Id) FROM users WHERE users.Name=${
    user as string
  } OR users.Email=${user as string}`;

  if (
    foundUser.rows.length === 0 ||
    foundUser.rows[0].id === currentUser.data.id
  )
    return;

  const existingChats =
    await sql`SELECT * FROM chats WHERE (chats.user_id_1=${currentUser.data.id} OR chats.user_id_2=${currentUser.data.id}) AND (chats.user_id_1=${foundUser.rows[0].id} OR chats.user_id_2=${foundUser.rows[0].id})`;

  if (existingChats.rows.length !== 0) return;
  await sql`INSERT INTO chats (user_id_1, user_id_2,user1_seen,user2_seen) VALUES (${currentUser.data.id},${foundUser.rows[0].id},'0','0')`;

  const createdChat =
    await sql`SELECT c.Id, c.user_id_1, c.user_id_2,c.user1_seen,c.user2_seen, u1.Name as name1, u1.Email as email1, u2.Name as name2, u2.Email as email2 FROM chats c JOIN users u1 ON c.user_id_1=u1.Id JOIN users u2 ON c.user_id_2=u2.Id WHERE user_id_1=${currentUser.data.id} AND user_id_2=${foundUser.rows[0].id}`;

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true,
  });

  pusher.trigger("newFriend", "create", {
    id: createdChat.rows[0].id,
    user_id_1: createdChat.rows[0].user_id_1,
    user_id_2: createdChat.rows[0].user_id_2,
    user1_seen: createdChat.rows[0].user1_seen,
    user2_seen: createdChat.rows[0].user2_seen,
    name1: createdChat.rows[0].name1,
    email1: createdChat.rows[0].email1,
    name2: createdChat.rows[0].name2,
    email2: createdChat.rows[0].email2,
  });
}
