import { getDataFromToken } from "@/utils/getDataFromToken";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getDataFromToken(req);

    const availableChats =
      await sql`SELECT c.Id,c.user_id_1,c.user_id_2,c.user1_seen,c.user2_seen,u1.Name as name1, u1.Email as email1, u2.Name as name2, u2.Email as email2 FROM chats c JOIN users u1 ON c.user_id_1=u1.Id JOIN users u2 ON c.user_id_2=u2.Id WHERE user_id_1=${currentUser.data.id} OR user_id_2=${currentUser.data.id}`;

    const response =  NextResponse.json(
      {
        chats: availableChats.rows,

        currentUser: currentUser.data,
      },
      { status: 200 }
    );
    
    //checking if the token is expired
    if(Date.now() >= currentUser.exp * 1000)
      response.cookies.set('token',"",{ httpOnly: true, expires: new Date(0) })
    
    return response
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
