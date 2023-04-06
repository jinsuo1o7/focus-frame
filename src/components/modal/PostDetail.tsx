import React from "react";
import { FullPost, SimplePost } from "@/model/post";
import useSWR from "swr";
import Image from "next/image";
import AvatarWithCreatedAt from "@/components/postlist/AvatarWithCreatedAt";
import CommentForm from "@/components/postlist/CommentForm";
import Avatar from "@/components/Avatar";
import HeartLine from "@/components/icons/HeartLine";
import BookMarkLine from "@/components/icons/BookMarkLine";
type Props = { post: SimplePost };
export default function PostDetail({ post }: Props) {
  const { id, username, userImage, image, text, createdAt, likes } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;
  return (
    <section className="flex flex-col xl:flex-row w-full h-full">
      <div className="relative basis-3/5 aspect-square">
        <Image
          className="object-contain"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="600px"
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <AvatarWithCreatedAt
          username={username}
          userImage={userImage}
          createdAt={createdAt}
        />
        <ul className="py-4 px-6 flex-1 overflow-auto bg-gray-50">
          {comments &&
            comments.map(
              ({ image, comment, username: commentUsername }, index) => (
                <li key={index} className="flex items-center">
                  <Avatar image={image} />
                  <p className="ml-3">
                    <span className="font-bold mr-1">{commentUsername}</span>
                    <span>{comment}</span>
                  </p>
                </li>
              )
            )}
        </ul>
        <div className="px-4 pb-4 pt-2 bg-white">
          <div className="flex items-center gap-2 text-xl cursor-pointer pt-2 px-2">
            <HeartLine />
            <BookMarkLine />
          </div>
          <CommentForm />
        </div>
      </div>
    </section>
  );
}
