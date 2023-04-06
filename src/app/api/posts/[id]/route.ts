import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getPost } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { id: string };
};
export async function GET(request: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    throw new Response("Authentication Error", { status: 401 });
  }

  return getPost(context.params.id).then(NextResponse.json);
}
