import React from "react";
import UserSearch from "@/components/search/UserSearch";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "User search",
  description: "User search page",
};
export default function Page() {
  return (
    <>
      <UserSearch />
    </>
  );
}
