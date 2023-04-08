"use client";
import React, { useState } from "react";
import { SimplePost } from "@/model/post";
import Image from "next/image";
import ModalPortal from "@/components/modal/ModalPortal";
import PostModal from "@/components/modal/PostModal";
import PostDetail from "@/components/modal/PostDetail";
import { signIn, useSession } from "next-auth/react";
type Props = { post: SimplePost; priority: boolean };
export default function PostGridCard({ post, priority }: Props) {
  const { image, comments } = post;
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const handleOpenPost = () => {
    if (!session?.user) {
      return signIn();
    }
    setShowModal(true);
  };
  return (
    <div className="relative aspect-square">
      <Image
        className="object-cover"
        src={image}
        alt={`${comments}`}
        fill
        sizes={"600px"}
        priority={priority}
        onClick={handleOpenPost}
      />
      {showModal && (
        <ModalPortal>
          <PostModal onClose={() => setShowModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
