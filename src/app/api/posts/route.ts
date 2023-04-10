import { createPost, getAllPosts, getFollowingPostsOf } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";
import { withSessionUser } from "@/util/session";

export async function GET() {
  return withSessionUser(async (user) => {
    // return getFollowingPostsOf(user.username).then(NextResponse.json);
    return getAllPosts().then(NextResponse.json);
  });
}

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const form = await req.formData();
    const text = form.get("text")?.toString();
    const file = form.get("file") as Blob;
    if (!text || !file) {
      return new Response("Bad Request", { status: 400 });
    }

    return createPost(user.id, text, file).then(NextResponse.json);
  });
}
