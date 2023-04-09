import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { addComment } from "@/service/posts";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { id, comment } = await req.json();

  if (!user) {
    return new NextResponse("Authentication Error", { status: 401 });
  }
  if (!id || comment === undefined) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  return addComment(id, user.id, comment).then(NextResponse.json);
}
