import React from "react";
import HeartLine from "@/components/icons/HeartLine";
import BookMarkLine from "@/components/icons/BookMarkLine";
import CommentForm from "@/components/postlist/CommentForm";
type Props = {
  text: string;
  likes: string[];
  comments: number;
};
export default function PostCardSection({ text, likes, comments }: Props) {
  return (
    <section className="p-4 bg-neutral-50">
      <div className="flex justify-between">
        <p className="font-semibold">{text}</p>
        <div className="flex items-center gap-2 text-xl cursor-pointer">
          <HeartLine />
          <BookMarkLine />
        </div>
      </div>
      <p className="text-neutral-400 text-sm">
        {likes.length} {likes.length > 0 ? "likes" : "like"} | {comments}{" "}
        {comments > 1 ? "comments" : "comment"}
      </p>
      <CommentForm />
    </section>
  );
}
