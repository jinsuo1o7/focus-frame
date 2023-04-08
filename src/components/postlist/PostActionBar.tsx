import React, { useState } from "react";
import HeartLine from "@/components/icons/HeartLine";
import BookMarkLine from "@/components/icons/BookMarkLine";
import ToggleButton from "@/components/icons/ToggleButton";
import HeartFill from "@/components/icons/HeartFill";
import BookMarkFill from "@/components/icons/BookMarkFill";
import { SimplePost } from "@/model/post";
import { useSession } from "next-auth/react";
import usePosts from "@/hooks/usePosts";

type Props = {
  post: SimplePost;
};
export default function PostActionBar({ post }: Props) {
  const { id, text, likes, comments, username, createdAt } = post;
  const { data: session } = useSession();
  const user = session?.user;
  const liked = user ? likes.includes(user.username) : false;
  const [bookmarked, setBookmarked] = useState(false);
  const { setLike } = usePosts();
  const handleLike = (like: boolean) => {
    setLike(post, user!.username, like);
  };

  return (
    <section>
      <div className="flex justify-between">
        <p className="font-semibold">{text}</p>

        <div className="flex items-center gap-2 text-xl cursor-pointer text-gray-700">
          <ToggleButton
            toggled={liked}
            onToggle={handleLike}
            onIcon={<HeartFill />}
            offIcon={<HeartLine />}
          />
          <ToggleButton
            toggled={bookmarked}
            onToggle={setBookmarked}
            onIcon={<BookMarkFill />}
            offIcon={<BookMarkLine />}
          />
        </div>
      </div>
      <p className="text-neutral-400 text-sm">
        {likes.length} {likes.length > 0 ? "likes" : "like"} | {comments}{" "}
        {comments && comments > 1 ? "comments" : "comment"}
      </p>
    </section>
  );
}
