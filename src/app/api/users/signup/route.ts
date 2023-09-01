import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres";
import bcryptjs from "bcryptjs";

export async function POST(req: Request) {
  const client = await db.connect();

  try {
    const reqBody = await req.json();
    const { name, email, password } = reqBody;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const users = await client.sql`SELECT * FROM users WHERE Name=${name}`;

    const emails = await client.sql`SELECT * FROM users WHERE Email=${email}`;

    if (users.rows.length === 0 && emails.rows.length === 0) {
      await client.sql`INSERT INTO users(Name,Email, Password) VALUES(${name},${email},${hashedPassword});`;
      return NextResponse.json({ message: "Added account", result: true });
    } else if (users.rows.length !== 0) {
      return NextResponse.json(
        { error: "Username is taken." },
        { status: 400 }
      );
    } else if (emails.rows.length !== 0) {
      return NextResponse.json(
        { error: "Email already in use." },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
