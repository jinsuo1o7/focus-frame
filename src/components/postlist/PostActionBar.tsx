import React from "react";
import HeartLine from "@/components/icons/HeartLine";
import BookMarkLine from "@/components/icons/BookMarkLine";
import ToggleButton from "@/components/icons/ToggleButton";
import HeartFill from "@/components/icons/HeartFill";
import BookMarkFill from "@/components/icons/BookMarkFill";
import { SimplePost } from "@/model/post";
import usePosts from "@/hooks/usePosts";
import useMe from "@/hooks/useMe";
import CommentForm from "@/components/postlist/CommentForm";
import { Comment } from "@/model/post";

type Props = {
  post: SimplePost;
  onComment: (comment: Comment) => void;
};
export default function PostActionBar({ post, onComment }: Props) {
  const { id, text, likes, comments } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();
  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;
  const handleLike = (like: boolean) => {
    user && setLike(post, user!.username, like);
  };
  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };
  const handleComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image });
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
            onToggle={handleBookmark}
            onIcon={<BookMarkFill />}
            offIcon={<BookMarkLine />}
          />
        </div>
      </div>
      <p className="text-neutral-400 text-sm">
        {likes.length} {likes.length > 0 ? "likes" : "like"} | {comments}{" "}
        {comments && comments > 1 ? "comments" : "comment"}
      </p>
      <CommentForm onPostComment={handleComment} />
    </section>
  );
}
