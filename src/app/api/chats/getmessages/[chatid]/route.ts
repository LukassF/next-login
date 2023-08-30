import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { chatid: number } }
) {
  try {
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
