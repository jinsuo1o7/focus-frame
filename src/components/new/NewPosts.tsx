"use client";
import React, {
  ChangeEvent,
  useState,
  DragEvent,
  FormEvent,
  useRef,
} from "react";
import { AuthUser } from "@/model/authUser";
import Avatar from "@/components/Avatar";
import FileIcon from "@/components/icons/FileIcon";
import ButtonCustom from "@/components/ButtonCustom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";

type Props = { user: AuthUser };

export default function NewPosts({ user: { image, username } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");

    fetch("/api/posts", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push("/");
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-10 mx-auto">
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center pt-[30%] gap-4 bg-neutral-200/70">
          <BarLoader width={200} />
          <p>Uploading posts...</p>
        </div>
      )}

      <Avatar image={image} size={"medium"} />
      <p className="mt-2 font-semibold">{username}</p>
      <form className="w-full flex flex-col mt-2" onSubmit={handleSubmit}>
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-full h-full min-h-[15rem] flex flex-col items-center justify-center ${
            !file && "border-2 border-gray-300"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div
              className={
                "absolute inset-0 z-10 bg-gray-100/70 pointer-events-none"
              }
            />
          )}
          {!file && (
            <div>
              <FileIcon />
              <p className="text-neutral-500">Drag and drop your image here</p>
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt={"file image"}
                fill
                sizes={"600px"}
              />
            </div>
          )}
        </label>
        <textarea
          className="outline-none text-lg border mt-2 p-3"
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder={"Write a caption"}
          ref={textRef}
        />
        {error && (
          <p className="text-red-500 text-center p-4 font-bold bg-red-white border-2 border-red-500 rounded-md mb-4">
            {error}
          </p>
        )}
        <ButtonCustom
          text={"Publish"}
          onClick={() => {}}
          className="bg-rose-500 w-1/2 mx-auto mt-2 py-1 text-white font-semibold rounded-md"
        />
      </form>
    </section>
  );
}
