"use client";

import { revalidateTodos } from "@/app/serverActions/revalidateTodos";
import Link from "next/link";

export default function AddTodoLayout({ children }) {
  return (
    <div className="min-h-[50vh] w-full flex flex-col items-center p-10">
      <div className="self-start mb-3 ">
        <Link
          href="/todo-list"
          className="inline-block underline underline-offset-2 decoration-solid"
          onClick={() => revalidateTodos()}
        >
          ALL TODOS
        </Link>
      </div>
      <div className="w-1/2 bg-slate-300 rounded p-5 flex-grow text-slate-600">
        <h1 className="tracking-wider text-2xl">ADD TODO</h1>
        {children}
      </div>
    </div>
  );
}
