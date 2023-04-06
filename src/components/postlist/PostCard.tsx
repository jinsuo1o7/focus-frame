import React from "react";
import { SimplePost } from "@/model/post";
import Image from "next/image";
import Avatar from "@/components/Avatar";
import { parseDate } from "@/util/date";
import PostActionBar from "@/components/postlist/PostCardSection";
type Props = { post: SimplePost; priority?: boolean };
export default function PostCard({
  post: { username, userImage, image, text, createdAt, likes, comments },
  priority,
}: Props) {
  return (
    <article className="border-2 border-black">
      <div className="w-full flex items-center gap-2 px-4 py-2 bg-neutral-200">
        <Avatar image={userImage ?? ""} />
        <p>{username}</p>
        <p className="ml-auto">{parseDate(createdAt)}</p>
      </div>
      <div className="relative w-full h-96 md:h-[300px] xl:h-[400px] overflow-hidden aspect-square">
        <Image
          src={image}
          alt={`${username}'s posts image`}
          fill
          sizes="500px"
          className="object-cover"
          priority={priority}
        />
      </div>
      <PostActionBar text={text} likes={likes} comments={comments} />
    </article>
  );
}
