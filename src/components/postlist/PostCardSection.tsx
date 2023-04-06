import React from "react";
import HeartLine from "@/components/icons/HeartLine";
import BookMarkLine from "@/components/icons/BookMarkLine";
type Props = {
  text?: string;
  likes: string[];
  comments?: number;
};
export default function PostCardSection({ text, likes, comments }: Props) {
  return (
    <section>
      <div className="flex justify-between">
        <p className="font-semibold">{text}</p>

        <div className="flex items-center gap-2 text-xl cursor-pointer">
          <HeartLine />
          <BookMarkLine />
        </div>
      </div>
      <p className="text-neutral-400 text-sm">
        {likes.length} {likes.length > 0 ? "likes" : "like"} | {comments}{" "}
        {comments && comments > 1 ? "comments" : "comment"}
      </p>
    </section>
  );
}
