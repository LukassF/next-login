import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { chatid: number } }
) {
  try {
    const userId = req.cookies.get("currentId")?.value || "";

    const Pusher = require("pusher");
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: "eu",
      useTLS: true,
    });

    const currentChat =
      await sql`SELECT * FROM chats WHERE chats.Id=${params.chatid}`;
    console.log("ran");

    const userNumber = currentChat.rows[0].user_id_1 == userId ? "1" : "2";

    await pusher.trigger("hasSeen", "toggleSeen", {
      chatId: params.chatid,
      user: userNumber,
      seen: true,
    });

    //detecting if the user has opened any new messages
    userNumber === "1"
      ? await sql`UPDATE chats SET user1_seen='1' WHERE chats.Id=${params.chatid}`
      : await sql`UPDATE chats SET user2_seen='1' WHERE chats.Id=${params.chatid}`;

    const messages =
      await sql`SELECT m.Message AS msg, m.Date AS date, m.User_ID AS user_id, m.Chat_id AS chat_id, u.Name AS username,u.Email AS email FROM messages m JOIN users u ON m.User_ID=u.Id WHERE m.Chat_id=${params.chatid}`;

    return NextResponse.json(
      {
        messages: messages.rows,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
