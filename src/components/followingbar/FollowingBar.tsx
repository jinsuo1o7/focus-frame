"use client";
import React from "react";
import useSWR from "swr";
import { HomeUser } from "@/model/authUser";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import { CircleLoader } from "react-spinners";
import SearchMoveBox from "@/components/followingbar/SearchMoveBox";
export default function FollowingBar() {
  const { data, isLoading, error } = useSWR<HomeUser>("/api/me");
  const followings = data?.following;

  if (error) {
    return <h1>Error occur while getting following list!</h1>;
  }
  return (
    <section>
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          {<CircleLoader className="text-center" size={24} />}
          <p className="ml-2 font-semibold">Load to get followings ...</p>
        </div>
      )}
      {!followings || (followings?.length === 0 && <SearchMoveBox />)}
      {followings && followings.length > 0 && (
        <div className="border-2 border-black border-collapse mt-4">
          <h1 className="text-xl text-center py-2">Following</h1>
          <ul className="p-4 max-h-[380px] overflow-auto">
            {followings.map(({ username, image }) => (
              <li key={username}>
                <Link href={`/user/${username}`}>
                  <div className="flex items-center rounded-md hover:bg-gray-200 py-2 px-4">
                    <Avatar image={image} size="medium" />
                    <p className="ml-4 font-semibold text-ellipsis overflow-hidden">
                      {username}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
