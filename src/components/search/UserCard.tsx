import React from "react";
import { SearchUser } from "@/model/authUser";
import Link from "next/link";
import Avatar from "@/components/Avatar";
type Prop = { user: SearchUser };
export default function UserCard({
  user: { name, username, image, following, followers },
}: Prop) {
  return (
    <Link
      href={`/user/${username}`}
      className="flex items-center gap-10 border-2 border-black p-4 mb-2 hover:bg-rose-300"
    >
      <Avatar image={image} size={"medium"} />
      <div>
        <p className="font-semibold">{username}</p>
        <p className="text-sm">{name}</p>
        <p className="text-neutral-500 text-sm">
          following : {following} | follower : {followers}
        </p>
      </div>
    </Link>
  );
}
