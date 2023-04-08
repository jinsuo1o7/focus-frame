"use client";
import React from "react";
import { HomeUser, ProfileUser } from "@/model/authUser";
import useSWR from "swr";
import ButtonCustom from "@/components/ButtonCustom";
type Props = { user: ProfileUser };
export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { data: loggedInUser } = useSWR<HomeUser>(`/api/me`);
  const showButton = loggedInUser && loggedInUser.username !== username;
  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find((user) => user.username === username);
  const text = isFollowing ? "Unfollow" : "Follow";

  const buttonBg = isFollowing ? "bg-rose-100" : "bg-rose-400";
  return (
    <>
      {showButton && (
        <ButtonCustom
          text={text}
          onClick={() => {}}
          className={`text-white px-2 py-1 rounded-md ${buttonBg}`}
        />
      )}
    </>
  );
}
