import React from "react";

export default function StatusBadge({ status }) {
  const className = "badge " + status.toLowerCase();
  return <span className={className}>{status}</span>;
}