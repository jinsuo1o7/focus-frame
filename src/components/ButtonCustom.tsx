import React from "react";

type Props = {
  text: string;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function ButtonCustom({
  text,
  className,
  onClick,
  disabled = false,
}: Props) {
  return (
    <button className={className || ""} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
