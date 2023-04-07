"use client";
import React, { FormEvent, useState } from "react";
import useSWR from "swr";
import { SearchUser } from "@/model/authUser";
import { CircleLoader } from "react-spinners";
import UserCard from "@/components/search/UserCard";
import useDebounce from "@/hooks/useDebounce";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const debounced = useDebounce(keyword, 500);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debounced}`);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <section className="flex flex-col items-center w-full max-w-screen-md mx-auto p-4">
      <div className="w-full">
        <h1 className="text-2xl py-4">Search User</h1>
        <form
          className="w-full border mb-4 rounded-md py-2 px-4 bg-rose-50"
          onSubmit={handleSubmit}
        >
          <input
            autoFocus
            className="outline-none w-full bg-transparent"
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search"
          />
        </form>

        {isLoading && <CircleLoader className="mx-auto" />}
        {error && <p>Error!</p>}
        {!isLoading && !error && users && users.length == 0 && <p>No Users.</p>}

        <ul>
          {users &&
            users.map((user) => (
              <li key={user.username}>
                <UserCard user={user} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
