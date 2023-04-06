"use client";
import React from "react";
import useSWR from "swr";
import { SimplePost } from "@/model/post";
import PostCard from "@/components/postlist/PostCard";
import { CircleLoader } from "react-spinners";

export default function PostCardList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>("/api/posts");
  return (
    <section className="w-full">
      {isLoading && <CircleLoader className="mx-auto" />}

      {posts && (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
