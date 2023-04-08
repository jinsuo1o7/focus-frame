"use client";
import React from "react";
import PostCard from "@/components/postlist/PostCard";
import { CircleLoader } from "react-spinners";
import usePosts from "@/hooks/usePosts";

export default function PostCardList() {
  const { posts, isLoading } = usePosts();
  return (
    <section className="w-full">
      {isLoading && <CircleLoader className="mx-auto" />}

      {posts && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {posts.map((post, index) => (
            <li key={post.id}>
              <PostCard post={post} priority={index < 4} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
