// src/components/Loader.jsx
import React from "react";

export default function Loader({ size = 6, text = "Loading..." }) {
  const w = `${size}rem`; // tailwind not used for dynamic sizing; keep basic inline style
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div
        className="animate-spin rounded-full border-4 border-t-transparent border-gray-300"
        style={{ width: w, height: w }}
        role="status"
        aria-label="loading"
      />
      {text && <div className="mt-3 text-sm text-gray-600">{text}</div>}
    </div>
  );
}
