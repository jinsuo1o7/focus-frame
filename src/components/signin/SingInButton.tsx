import React from "react";
import { signIn } from "next-auth/react";
import GithubFill from "@/components/icons/GithubFill";
import GoogleFill from "@/components/icons/GoogleFill";

type Props = {
  id: string;
  name: string;
  callbackUrl: string;
};

const providers = [
  { icon: <GithubFill />, name: "GitHub" },
  { icon: <GoogleFill />, name: "Google" },
];
export default function SingInButton({ id, name, callbackUrl }: Props) {
  const icon = providers.find((provider) => provider.name === name)?.icon;
  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex border border-black rounded-sm mb-1 w-fit px-8 py-3 cursor-pointer hover:bg-black hover:text-white"
        onClick={() => signIn(id, { callbackUrl })}
      >
        <span className="text-2xl mr-4">{icon}</span>
        <p>Sign in with {name}</p>
      </div>
    </div>
  );
}
