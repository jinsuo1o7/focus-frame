"use client";
import React from "react";
import HomeFill from "@/components/icons/HomeFill";
import HomeLine from "@/components/icons/HomeLine";
import SearchFill from "@/components/icons/SearchFill";
import SearchLine from "@/components/icons/SearchLine";
import PlusSquareLine from "@/components/icons/PlusSquareLine";
import PlusSquareFill from "@/components/icons/PlusSquareFill";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "@/components/icons/LogoIcon";
import ButtonCustom from "@/components/ButtonCustom";
import { signIn, signOut, useSession } from "next-auth/react";
import Avatar from "@/components/Avatar";

const paths = [
  { path: "/", onPath: <HomeFill />, offPath: <HomeLine />, text: "Home" },
  {
    path: "/search",
    onPath: <SearchFill />,
    offPath: <SearchLine />,
    text: "Search",
  },
  {
    path: "/new",
    onPath: <PlusSquareFill />,
    offPath: <PlusSquareLine />,
    text: "Add post",
  },
];

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const curPath = usePathname();
  const signButtonStyle = "border-b border-black px-2";

  return (
    <header className="flex justify-between items-center py-3 px-8 border-b shadow-sm sticky top-0">
      <Link href={"/"} className="flex items-center">
        <LogoIcon className="text-3xl mr-1" />
        <h1 className="hidden md:block text-2xl whitespace-nowrap">
          Focus Frame
        </h1>
      </Link>

      <nav>
        <ul className="flex gap-4 items-center">
          {paths.map(({ path, onPath, offPath, text }) => (
            <li key={path}>
              <Link
                href={path}
                className={`flex items-center text-2xl rounded-full border px-3 py-1 transition hover:shadow-md
                ${curPath === path && "text-white bg-black"}`}
              >
                <span>{curPath === path ? onPath : offPath}</span>
                <span className="hidden sm:block text-sm ml-2">{text}</span>
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} />
              </Link>
            </li>
          )}
          <li className="ml-4">
            {session ? (
              <ButtonCustom
                text={"Sign out"}
                className={signButtonStyle}
                onClick={signOut}
              />
            ) : (
              <ButtonCustom
                text={"Sign in"}
                className={signButtonStyle}
                onClick={signIn}
              />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
