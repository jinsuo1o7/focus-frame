import { AuthUser } from "@/model/authUser";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";

export async function withSessionUser(
  handler: (user: AuthUser) => Promise<Response>
): Promise<Response> {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new NextResponse("Authentication Error", { status: 401 });
  }

  return handler(user);
}
