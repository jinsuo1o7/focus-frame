import React from "react";
type AvatarSize = "small" | "medium" | "large";
type Props = {
  image?: string | null;
  size?: AvatarSize;
};
export default function Avatar({ image, size = "small" }: Props) {
  return (
    <div className={`${getAvatarSize(size)} rounded-full overflow-hidden`}>
      <img
        className="object-cover"
        src={image ?? undefined}
        alt="avatar image"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getAvatarSize(size: AvatarSize) {
  switch (size) {
    case "small":
      return "w-9 h-9";
    case "medium":
      return "w-14 h-14";
    case "large":
      return "w-20 h-20";
  }
}
