import ChatLog from "@/components/chat/ChatLog";
import Form from "@/components/chat/Form";
import Link from "next/link";
import { db } from "@vercel/postgres";
import { decodedTokenNoReq } from "@/utils/decodeTokenNoRequest";

async function getData() {
  const client = await db.connect();

  const data =
    await client.sql`SELECT c.Message AS msg, c.Date AS date, c.User_ID AS user_id, u.Name AS username,u.Email AS email FROM chat c JOIN users u ON c.User_ID=u.Id`;

  return data.rows;
}

export default async function Home() {
  const data = await getData();
  const {
    data: { id },
  } = decodedTokenNoReq();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <nav>
        <Link key={Math.random()} href={"/signup"}>
          Sign Up
        </Link>
        <Link key={Math.random()} href={"/login"}>
          Log In
        </Link>
      </nav>

      <div>
        <ChatLog chats={data as Array<chatsProps>} currentUserId={id} />
        <Form />
      </div>
    </main>
  );
}
