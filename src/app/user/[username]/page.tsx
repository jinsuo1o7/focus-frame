import React from "react";
import { getUserProfile } from "@/service/user";
import { notFound } from "next/navigation";
import UserProfile from "@/components/userprofile/UserProfile";
import UserPosts from "@/components/userprofile/UserPosts";
type Prop = {
  params: { username: string };
};
export default async function Page({ params: { username } }: Prop) {
  const user = await getUserProfile(username);

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
