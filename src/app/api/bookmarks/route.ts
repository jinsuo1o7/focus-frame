import { NextRequest, NextResponse } from "next/server";
import { addBookmark, removeBookmark } from "@/service/user";
import { withSessionUser } from "@/util/session";

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, bookmark } = await req.json();

    if (!id || bookmark == null) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const request = bookmark ? addBookmark : removeBookmark;

    return request(id, user.id) //
      .then(NextResponse.json)
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
