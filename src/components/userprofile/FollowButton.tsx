"use client";
import React, { useState, useTransition } from "react";
import { ProfileUser } from "@/model/authUser";
import ButtonCustom from "@/components/ButtonCustom";
import useMe from "@/hooks/useMe";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";
type Props = { user: ProfileUser };
export default function FollowButton({ user }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();
  const showButton = loggedInUser && loggedInUser.username !== username;
  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find((user) => user.username === username);
  const text = isFollowing ? "Unfollow" : "Follow";

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !isFollowing);
    setIsFetching(false);
    startTransition(() => router.refresh());
  };
  const buttonBg = isFollowing ? "bg-rose-100" : "bg-rose-400";
  return (
    <>
      {showButton && (
        <div className="relative">
          <ButtonCustom
            text={text}
            onClick={handleFollow}
            disabled={isUpdating}
            className={`text-white px-2 py-1 rounded-md ${buttonBg} 
            ${isUpdating && "bg-gray-600"}`}
          />
          {isUpdating && <BarLoader className={"mx-auto mt-2"} width={40} />}
        </div>
      )}
    </>
  );
}
