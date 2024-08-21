"use client";

import { useState } from "react";

export default function Expand({ title, children }) {
  const [open, setOpen] = useState(true);

  return (
    <div onClick={() => setOpen(!open)}>
      <div className="bg-zinc-400 flex p-1 justify-between items-center h-10">
        <h3 className="text-black text-xl tracking-wide">{title}</h3>
        {open ? (
          <span className="text-black text-lg me-10">&uarr;</span>
        ) : (
          <span className="text-black text-lg me-10">&darr;</span>
        )}
      </div>
      {open ? <div>{children}</div> : null}
    </div>
  );
}
