import React from "react";
import { TbFrame } from "react-icons/tb";

type Props = { className: string };
export default function LogoIcon({ className }: Props) {
  return <TbFrame className={className || ""} />;
}
