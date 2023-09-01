import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres";

export async function GET(request: NextRequest) {
  const client = await db.connect();
  try {
    const currentUser = await getDataFromToken(request);
    const userInfo =
      // await client.sql`SELECT Id,Name,Email FROM users WHERE id=${currentUserId.id}`;
      await client.sql`
      SELECT u.Id,u.Name,u.Email,COUNT(DISTINCT c.Id) AS NumChats, COUNT(DISTINCT m.id) AS NumMessages FROM users u 
      LEFT JOIN chats c ON c.user_id_1=u.Id OR c.user_id_2=u.Id 
      LEFT JOIN messages m ON m.user_id=u.Id 
      GROUP BY u.Id 
      HAVING u.Id=${currentUser.id}`;

    return NextResponse.json({
      user: userInfo.rows[0],
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
