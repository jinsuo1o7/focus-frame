import React from "react";

type Props = {
  text: string;
  className?: string;
};

export default function ButtonCustom({ text, className }: Props) {
  return <button className={className || ""}>{text}</button>;
}
