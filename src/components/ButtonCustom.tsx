import React from "react";

type Props = {
  text: string;
  className?: string;
  onClick: () => void;
};

export default function ButtonCustom({ text, className, onClick }: Props) {
  return (
    <button className={className || ""} onClick={onClick}>
      {text}
    </button>
  );
}
