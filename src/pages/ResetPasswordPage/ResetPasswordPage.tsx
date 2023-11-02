import { useParams } from "react-router-dom";
import ResetPassword from "../../components/ResetPassword/ResetPassword";
import "./ResetPasswordPage.css";
import Logo from "../../pictures/sport_go_logo.svg";

const ResetPasswordPage = () => {
  const { token } = useParams();

  return (
    <div className="reset-password-page">
      <div className="ResetPage-logoName">
        <img src={Logo} alt="SportGoLogo" />
      </div>
      <div className="reset-password-page-content">
        <ResetPassword token={token || ""} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
