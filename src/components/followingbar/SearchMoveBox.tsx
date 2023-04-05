import React from "react";
import Link from "next/link";

export default function SearchMoveBox() {
  return (
    <Link href={"/search"}>
      <div className="border-2 border-black font-semibold text-center mt-4">
        <p>No following</p>
        <p>Search Users ➡️</p>
      </div>
    </Link>
  );
}
