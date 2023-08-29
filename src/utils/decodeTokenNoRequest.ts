"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const decodedTokenNoReq = () => {
  const cookie = cookies().get("token");
  const currentUser: any = jwt.verify(cookie!.value, process.env.TOKEN_SECRET!);

  return currentUser;
};
