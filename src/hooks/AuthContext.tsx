import React, { createContext, useContext } from "react";
import { useAuth, UserParams } from "./useAuth";

interface AuthContextType {
  login: ({ username, password }: UserParams) => Promise<{
    success: boolean;
  }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authHook = useAuth();

  return (
    <AuthContext.Provider value={authHook}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
