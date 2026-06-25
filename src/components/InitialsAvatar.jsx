import React from "react";

export default function InitialsAvatar({ name, bg = "#EDE9FE", color = "#5B21B6" }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="initials-avatar"
      style={{ background: bg, color }}
    >
      {initials}
    </div>
  );
}