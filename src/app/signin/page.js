"use client";

import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spnner";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function resetError() {
    setError("");
  }

  const { setAuthUser } = useAuthContext();
  const router = useRouter();

  function handleUsernameChange(e) {
    resetError();
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    resetError();
    setPassword(e.target.value);
  }

  /**
   * As this component runs on client fetch urls are appended to page domain and the request is made
   * Therefore we are not using absolute URL here
   * Also client components do not have access to process.env variables
   */
  async function handleLogin() {
    console.log("handle login called");
    resetError();

    try {
      setLoading(true);

      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const response = await res.json();

      if (response.username) {
        setAuthUser(response.username);
        console.log("inside here");
        router.push("/todo-list");
      } else {
        setError(response.message);
      }
    } catch {
      setError("Something went wrong !");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 h-[70vh]  justify-center items-center">
      {error && (
        <div className="mb-3 text-red-500 text-lg tracking-wider">{error}</div>
      )}
      <div className="flex gap-4">
        <label className="text-lg tracking-wider" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="text-black px-3 focus:outline-none"
        />
      </div>

      <div className="flex gap-4">
        <label className="text-lg tracking-wider" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="text-black px-3 focus: outline-none"
        />
      </div>

      <div className="flex gap-4 items-center">
        <button
          className="text-lg tracking-wide border-2 px-2 py-0.5 rounded border-slate-400"
          onClick={handleLogin}
        >
          Login
        </button>
        {loading && <Spinner />}
      </div>
    </div>
  );
}
