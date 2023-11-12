import React, { createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
}

interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Define a provider that will wrap your app
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue: AuthContextProps = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Create a custom hook to easily access the context in your components
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
