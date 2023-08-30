import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const currentUserId = req.cookies.get("currentId")?.value || "";
    const availableChats =
      await sql`SELECT * FROM chats WHERE user_id_1=${currentUserId} OR user_id_2=${currentUserId}`;

    return NextResponse.json(
      {
        chats: availableChats.rows,
        currentUserId: currentUserId,
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
