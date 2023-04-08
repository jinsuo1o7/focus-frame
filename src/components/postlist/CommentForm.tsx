import React from "react";
import ButtonCustom from "@/components/ButtonCustom";

export default function CommentForm() {
  return (
    <form className="flex justify-between items-center w-full mt-4">
      <input
        className="w-10/12 pr-4 outline-none bg-neutral-200 px-4 py-1 rounded-lg text-sm mr-4"
        type="text"
        placeholder="Add a comment"
      />
      <ButtonCustom
        text={"Post"}
        onClick={() => {}}
        className={
          "bg-red-300 px-3 py-1  rounded-lg text-sm font-semibold text-white"
        }
      />
    </form>
  );
}
