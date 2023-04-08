import React from "react";
import useSWR from "swr";
import { CircleLoader } from "react-spinners";
import { SimplePost } from "@/model/post";
import PostGridCard from "@/components/userprofile/PostGridCard";
type Props = {
  username: string;
  query: string;
};
export default function UserPostGrid({ username, query }: Props) {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);
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
