import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getUserByUsername } from "@/service/user";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    throw new Response("Authentication Error", { status: 401 });
  }
  return getUserByUsername(user.username).then(NextResponse.json);
}
