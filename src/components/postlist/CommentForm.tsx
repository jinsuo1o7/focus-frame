import React, { FormEvent, useState } from "react";
import ButtonCustom from "@/components/ButtonCustom";
type Props = {
  onPostComment: (comment: string) => void;
};
export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("");
  const buttonDisable = comment.length === 0;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between items-center w-full mt-4"
    >
      <input
        className="w-10/12 pr-4 outline-none bg-neutral-200 px-4 py-1 rounded-lg text-sm mr-4"
        type="text"
        placeholder="Add a comment"
        required
        maxLength={50}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <ButtonCustom
        text={"Post"}
        onClick={() => {}}
        disabled={buttonDisable}
        className={`px-3 py-1  rounded-lg text-sm font-semibold text-white 
        ${buttonDisable ? "bg-gray-400" : "bg-red-300"}`}
      />
    </form>
  );
}
