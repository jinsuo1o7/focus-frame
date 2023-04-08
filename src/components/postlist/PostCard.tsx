import React, { useState } from "react";
import { SimplePost } from "@/model/post";
import Image from "next/image";
import PostActionBar from "@/components/postlist/PostActionBar";
import ModalPortal from "@/components/modal/ModalPortal";
import PostModal from "@/components/modal/PostModal";
import PostDetail from "@/components/modal/PostDetail";
import AvatarWithCreatedAt from "@/components/postlist/AvatarWithCreatedAt";
import CommentForm from "@/components/postlist/CommentForm";
type Props = { post: SimplePost; priority?: boolean };
export default function PostCard({ post, priority }: Props) {
  const [showModal, setShowModal] = useState(false);
  const { username, userImage, image, text, createdAt, likes, comments } = post;
  return (
    <article className="border-2 border-black">
      <AvatarWithCreatedAt
        username={username}
        userImage={userImage}
        createdAt={createdAt}
      />
      <div
        onClick={() => setShowModal(true)}
        className="relative w-full h-96 md:h-[600px] xl:h-[450px] overflow-hidden aspect-square"
      >
        <Image
          src={image}
          alt={`${username}'s posts image`}
          fill
          sizes="500px"
          className="object-cover cursor-pointer"
          priority={priority}
        />
      </div>

      <section className="p-4 bg-neutral-50">
        <PostActionBar post={post} />
        <CommentForm />
      </section>

      {showModal && (
        <ModalPortal>
          <PostModal onClose={() => setShowModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
