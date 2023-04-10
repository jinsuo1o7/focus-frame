import { getUserByUsername } from "@/service/user";
import { NextResponse } from "next/server";
import { withSessionUser } from "@/util/session";

export async function GET() {
  return withSessionUser(async (user) => {
    return getUserByUsername(user.username).then(NextResponse.json);
  });
}
