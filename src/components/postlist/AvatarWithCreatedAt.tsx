import React from "react";
import Avatar from "@/components/Avatar";
import { parseDate } from "@/util/date";
type Props = { username: string; userImage: string; createdAt: string };
export default function AvatarWithCreatedAt({
  userImage,
  username,
  createdAt,
}: Props) {
  return (
    <div className="w-full flex items-center gap-2 px-4 py-2 bg-neutral-200 hover:bg-rose-300">
      <Avatar image={userImage ?? ""} />
      <p>{username}</p>
      <p className="ml-auto">{parseDate(createdAt)}</p>
    </div>
  );
}
