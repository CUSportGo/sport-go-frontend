import { useParams } from "react-router-dom";
import ResetPassword from "../../components/ResetPassword/ResetPassword";
import "./ResetPasswordPage.css";

const ResetPasswordPage = () => {
  const { token } = useParams();

  return (
    <div className="reset-password-page">
      <div className="sport-go-logo">
        SPORT <span className="sport-go-text"> GO</span>
      </div>
      <div className="reset-password-page-content">
        <ResetPassword token={token || ""} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
