import React from "react";
import { ProfileUser } from "@/model/authUser";
import Avatar from "@/components/Avatar";
import FollowButton from "@/components/userprofile/FollowButton";
type Props = {
  user: ProfileUser;
};
export default function UserProfile({ user }: Props) {
  const { name, username, email, image, following, followers, posts } = user;
  const userInfo = [
    { title: "Posts", data: posts },
    { title: "Followers", data: followers },
    { title: "Following", data: following },
  ];
  return (
    <section className="w-full p-4">
      <div className="flex flex-col gap-4 md:flex-row justify-around items-center max-w-screen-lg mx-auto border-2 border-black p-4">
        <div className="flex flex-col items-center">
          <Avatar image={image} size="xlarge" />
          <h1 className="text-3xl pt-4">{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="flex flex-col gap-2 ml-4">
          {userInfo.map(({ title, data }, index) => (
            <li key={index}>
              <p className="text-2xl text-ellipsis">
                {title} {data}
              </p>
            </li>
          ))}
        </ul>
        <div className="text-center">
          <h1 className="text-2xl">Contact</h1>
          <p>{email}</p>
        </div>
      </div>
    </section>
  );
}
