import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Cookies from "js-cookie";
import HomePage from "../pages/HomePage/HomePage";
import AdminPage from "../pages/AdminPage/AdminPage";

interface RequireAuthProps {
  roles: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ roles }) => {
  const { user } = useAuth();
  const isCookieValid = Cookies.get("accessToken") !== undefined;

  if (!isCookieValid) {
    return <Navigate to="/login" />;
  }

  return (
    user &&
    (roles.includes(user?.role ?? "") ? (
      <Outlet />
    ) : user ? (
      <Navigate to="/unauthorized" />
    ) : (
      <Navigate to="/login" />
    ))
  );
};

const HomeRoute = (role:string) => {
    if (role === "USER") {
      return <HomePage />
    } else if (role === "SPORTAREA") {
      return <div>Sport Area Home</div>
    } else if (role === "ADMIN") {
      return <AdminPage />;
    } else {
      <div>Unauthorized</div>
    }
}

export { HomeRoute };

export default RequireAuth;
