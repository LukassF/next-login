import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const client = await db.connect();

  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const { rows } = await client.sql`SELECT * FROM users WHERE Email=${email}`;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "User doesn't exist." },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, rows[0].password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const tokenData = {
      data: {
        id: rows[0].id,
        username: rows[0].name,
        email: rows[0].email,
      },
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "6h",
    });

    const response = NextResponse.json({
      message: "Login successful!",
      id: rows[0].id,
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    response.cookies.set("currentId", rows[0].id, { httpOnly: true });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
