import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Cookies from "js-cookie";
import HomePage from "../pages/HomePage/HomePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import SportAreaHomePage from "../pages/SportAreaHomePage/SportAreaHomePage";

interface RequireAuthProps {
  roles: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ roles }) => {
  const { user } = useAuth();
  const isCookieValid =
    Cookies.get("accessToken") !== undefined &&
    Cookies.get("accessToken") !== "";
  const location = useLocation();

  if (!isCookieValid) {
    return <Navigate to="/login" />;
  }

  return (
    user &&
    (roles.includes(user?.role ?? "") ? (
      <Outlet />
    ) : user ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    ))
  );
};

const HomeRoute = (role: string) => {
  if (role === "USER") {
    return <HomePage />;
  } else if (role === "SPORTAREA") {
    return <SportAreaHomePage />;
  } else if (role === "ADMIN") {
    return <AdminPage />;
  } else {
    <div>Unauthorized</div>;
  }
};

export { HomeRoute };

export default RequireAuth;
