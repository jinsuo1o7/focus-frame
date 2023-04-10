import { getPost } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";
import { withSessionUser } from "@/util/session";

type Context = {
  params: { id: string };
};
export async function GET(request: NextRequest, context: Context) {
  return withSessionUser(async () => {
    return getPost(context.params.id).then(NextResponse.json);
  });
}
