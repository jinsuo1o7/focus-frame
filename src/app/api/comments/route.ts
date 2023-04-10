import { NextRequest, NextResponse } from "next/server";
import { addComment } from "@/service/posts";
import { withSessionUser } from "@/util/session";

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, comment } = await req.json();

    if (!id || comment == null) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    return addComment(id, user.id, comment).then(NextResponse.json);
  });
}
