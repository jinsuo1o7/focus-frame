import React from "react";
import { AuthUser } from "@/model/authUser";
import Avatar from "@/components/Avatar";
import Link from "next/link";
type Props = { user: AuthUser };
export default function SideBar({ user: { name, username, image } }: Props) {
  return (
    <Link
      href={`/user/${username}`}
      className="flex items-center border-2 border-black p-4 transition hover:bg-black hover:text-white"
    >
      {image && <Avatar image={image} size={"large"} />}
      <div className="ml-7">
        <p className="font-semibold">{name}</p>
        <p className="text-neutral-500">{username}</p>
      </div>
    </Link>
  );
}
