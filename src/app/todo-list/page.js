/**
 * This is a server component
 */

import Link from "next/link";
import TodoItem from "../components/TodoItem";

export default async function Todos() {
  const res = await fetch(`${process.env.URL}/todos`, { cache: "no-store" });
  const todos = await res.json();

  return (
    <div className="min-h-[70vh] w-full  px-52 py-10">
      <div className="text-right">
        <Link
          href="/todo-list/add"
          className="border border-slate-700 px-5 py-2 mb-4 hover:bg-slate-500 hover:text-slate-200 inline-block"
        >
          ADD
        </Link>
      </div>
      <ul className="flex flex-col gap-10">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} id={todo.id} />
        ))}
      </ul>
    </div>
  );
}
