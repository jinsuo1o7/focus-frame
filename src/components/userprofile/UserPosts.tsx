"use client";
import React, { useState } from "react";
import { ProfileUser } from "@/model/authUser";
import ButtonCustom from "@/components/ButtonCustom";
import UserPostGrid from "@/components/userprofile/UserPostGrid";
import MyPostsLine from "@/components/icons/MyPostLine";
import BookMarkLine from "@/components/icons/BookMarkLine";
import HeartLine from "@/components/icons/HeartLine";

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: "my", icon: <MyPostsLine /> },
  { type: "saved", icon: <BookMarkLine /> },
  { type: "liked", icon: <HeartLine /> },
];
export default function UserPosts({ user }: Props) {
  const [query, setQuery] = useState(tabs[0].type);
  const { username } = user;

  return (
    <section className="min-h-screen">
      <ul className="flex w-full justify-center max-w-screen-lg mx-auto gap-8 mt-10 pb-4 border-b">
        {tabs.map(({ type, icon }) => (
          <li
            key={type}
            onClick={() => setQuery(type)}
            className={getBorderStyle(type, query)}
          >
            <span className="text-2xl">{icon}</span>
            <ButtonCustom text={type} onClick={() => {}} />
          </li>
        ))}
      </ul>
      <UserPostGrid username={username} query={query} />
    </section>
  );
}

function getBorderStyle(type: string, query: string) {
  return `flex flex-col items-center w-12 px-8 py-1 cursor-pointer rounded-md
            ${
              query === type
                ? "border-2 border-rose-400"
                : "border border-neutral-200"
            }`;
}
