"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  username: "",
  setAuthUser: function () {},
});

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState("");

  return (
    <AuthContext.Provider
      value={{
        username: authUser,
        setAuthUser: setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
