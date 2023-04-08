import React from "react";
import { getUserProfile } from "@/service/user";
import { notFound } from "next/navigation";
import UserProfile from "@/components/userprofile/UserProfile";
import UserPosts from "@/components/userprofile/UserPosts";
import { Metadata } from "next";
import { cache } from "react";

type Prop = {
  params: { username: string };
};

const getUser = cache(async (username: string) => getUserProfile(username));
export default async function Page({ params: { username } }: Prop) {
  const user = await getUser(username);

  if (!user) {
    notFound();
  }
  return (
    <section>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { username },
}: Prop): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user.name} (@${user.username}) Photos`,
    description: `${user.name}'s all posts`,
  };
}
