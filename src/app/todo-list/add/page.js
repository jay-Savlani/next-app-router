"use client";

import { useRef, useState } from "react";
import Spinner from "@/app/components/Spnner";

export default function AddTodo() {
  const todoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const todo = todoRef.current.value;

    if (todo) {
      try {
        setError("");
        setLoading(true);
        setSuccess("");

        const response = await fetch("/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ todo, completed: false }),
        });

        const res = await response.json();

        if (!response.ok) {
          setError(res.message);
        } else {
          setSuccess(res.message);
        }
      } catch (error) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-10">
        <div className="flex items-center gap-4">
          <label className="tracking-wide">Todo</label>
          <input
            ref={todoRef}
            className="p-2 focus:outline-none rounded w-3/4"
          />
        </div>
        <div className="flex gap-4 items-center mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="tracking-widest border-2 border-gray-600 rounded px-3 py-1.5 shadow"
          >
            ADD
          </button>
          {loading && <Spinner />}
          {error && (
            <span className="text-base tracking-wide text-red-400">
              {error}
            </span>
          )}
          {success && (
            <span className="text-base tracking-wide text-green-800">
              {success}
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
