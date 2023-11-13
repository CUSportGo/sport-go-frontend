import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { apiClient } from "../utils/clients";
import { useEffect } from "react";

interface RequireAuthProps {
  roles: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ roles }) => {
  const { user } = useAuth();
  
  return user && (roles.includes(user?.role ?? "") ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/login" />
  ));
};

export default RequireAuth;
