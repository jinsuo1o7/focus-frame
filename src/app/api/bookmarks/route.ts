import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { addBookmark, removeBookmark } from "@/service/user";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { id, bookmark } = await req.json();

  if (!user) {
    return new NextResponse("Authentication Error", { status: 401 });
  }
  if (!id || bookmark === undefined) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const request = bookmark ? addBookmark : removeBookmark;

  return request(id, user.id) //
    .then(NextResponse.json)
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
