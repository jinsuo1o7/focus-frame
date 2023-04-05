"use client";
import React from "react";
import { ClientSafeProvider } from "next-auth/src/react/types";
import SingInButton from "@/components/signin/SingInButton";
import signInPic from "../../../public/singIn.jpg";
import Image from "next/image";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};
export default function SignIn({ providers, callbackUrl }: Props) {
  return (
    <section className="w-full flex h-screen">
      <div className="basis-full lg:basis-1/2 flex flex-col justify-center items-center bg-neutral-50">
        <h1 className="text-3xl">Welcome back</h1>
        <p className="text-neutral-400 mb-4">
          Welcome back! Please enter with social account
        </p>
        {Object.values(providers).map(({ name, id }) => (
          <SingInButton
            key={id}
            id={id}
            name={name}
            callbackUrl={callbackUrl}
          />
        ))}
      </div>
      <div className="relative basis-0 hidden lg:block lg:basis-1/2">
        <Image src={signInPic} alt={"Sing with us"} fill />
      </div>
    </section>
  );
}
