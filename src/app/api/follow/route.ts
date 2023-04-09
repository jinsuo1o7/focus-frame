import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { follow, unfollow } from "@/service/user";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { id: targetId, follow: isFollow } = await req.json();

  if (!user) {
    return new NextResponse("Authentication Error", { status: 401 });
  }
  if (!targetId || isFollow === undefined) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const request = isFollow ? follow : unfollow;

  return request(user.id, targetId) //
    .then(NextResponse.json)
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
