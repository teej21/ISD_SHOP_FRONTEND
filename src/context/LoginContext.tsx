import React, { createContext, useState, useContext, ReactNode } from "react";
import { ResponseBody } from "../interface/IUserInfo.ts";

interface AuthContextProps {
  token: ResponseBody | null;
  setToken: React.Dispatch<React.SetStateAction<ResponseBody | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<ResponseBody | null>(null);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
