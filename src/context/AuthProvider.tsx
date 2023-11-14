import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { apiClient } from "../utils/clients";
import Cookies from "js-cookie";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileUrl: string;
  role: string;
  sportAreaId?: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Define a provider that will wrap your app
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const isCookieValid =
    Cookies.get("accessToken") !== undefined &&
    Cookies.get("accessToken") !== "";

  const contextValue: AuthContextProps = {
    user,
    setUser,
  };

  useEffect(() => {
    const fetchUser = async () => {
      apiClient
        .getUserProfile()
        .then((res) => {
          // console.log(res.data);
          if (res.data) {
            setUser(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (isCookieValid) {
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Create a custom hook to easily access the context in your components
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
