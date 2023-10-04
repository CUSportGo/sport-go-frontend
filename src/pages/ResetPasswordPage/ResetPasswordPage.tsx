import { useState } from "react";
import ResetPassword from "../../components/ResetPassword/ResetPassword";
import "./ResetPasswordPage.css";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  const handleConfirmPasswordChange = (newConfirmPassword: string) => {
    setConfirmPassword(newConfirmPassword);
  };

  const handleResetPasswordOnClick = () => {
    console.log("Reset Password!");
  };

  return (
    <div className="reset-password-page">
      <div className="sport-go-logo">
        SPORT <span className="sport-go-text"> GO</span>
      </div>
      <div className="reset-password-page-content">
        <ResetPassword
          password={password}
          confirmPassword={confirmPassword}
          handlePasswordChange={handlePasswordChange}
          handleConfirmPasswordChange={handleConfirmPasswordChange}
          handleResetPasswordOnClick={handleResetPasswordOnClick}
        />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
