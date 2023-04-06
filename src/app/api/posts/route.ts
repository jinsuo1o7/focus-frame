import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getFollowingPostsOf } from "@/service/posts";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    throw new Response("Authentication Error", { status: 401 });
  }

  return getFollowingPostsOf(user.username).then(NextResponse.json);
}
