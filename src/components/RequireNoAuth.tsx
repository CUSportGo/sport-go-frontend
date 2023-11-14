import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const RequireNoAuth:React.FC = () => {
  const isCookieValid = Cookies.get("accessToken") !== undefined;

  if (isCookieValid) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
};

export default RequireNoAuth;
