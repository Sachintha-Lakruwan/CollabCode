import React from "react";

interface AvatarProps {
  index: number;
  item: string;
}

export default function Avatar({ index, item }: AvatarProps) {
  return (
    <li className="h-10 aspect-square bg-zinc-200 rounded-full" key={index}>
      <img
        src={`https://avatar.iran.liara.run/public/${item}`}
        alt="user avatar"
        className="w-full h-full object-cover rounded-full"
      />
    </li>
  );
}
