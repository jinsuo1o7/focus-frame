import React from "react";
import { CircleLoader } from "react-spinners";
import PostGridCard from "@/components/userprofile/PostGridCard";
import usePosts from "@/hooks/usePosts";

export default function UserPostGrid() {
  const { posts, isLoading } = usePosts();
  return (
    <div className="p-8">
      {isLoading && <CircleLoader className="mx-auto" />}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 4} />
            </li>
          ))}
      </ul>
    </div>
  );
}
