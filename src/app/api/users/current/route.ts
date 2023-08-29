import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres";

export async function GET(request: NextRequest) {
  const client = await db.connect();
  try {
    const currentUserId = await getDataFromToken(request);
    const currentUser =
      await client.sql`SELECT * FROM users WHERE id=${currentUserId}`;

    return NextResponse.json({
      user: currentUser.rows[0],
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
