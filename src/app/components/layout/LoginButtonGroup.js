"use client";

import Button from "../Button";
import { useAuthContext } from "../../contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";

export default function LoginButtonGroup() {
  const { username, setAuthUser } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  function handleLogin() {
    router.push("/signin");
  }

  function handleLogout() {
    router.push("/");
    setAuthUser("");
  }

  if (pathname === "/signin") {
    return null;
  }

  return (
    <div className="flex items-center gap-5 flex-grow absolute right-0 top-0 p-6">
      {username ? (
        <span className="text-lg">Welcome {username}!</span>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
      {username && <Button onClick={handleLogout}>Logout</Button>}
    </div>
  );
}
