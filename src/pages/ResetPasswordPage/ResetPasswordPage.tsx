import { useState } from "react";
import ResetPassword from "../../components/ResetPassword/ResetPassword";

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
    <div>
      <ResetPassword
        password={password}
        confirmPassword={confirmPassword}
        handlePasswordChange={handlePasswordChange}
        handleConfirmPasswordChange={handleConfirmPasswordChange}
        handleResetPasswordOnClick={handleResetPasswordOnClick}
      />
    </div>
  );
};

export default ResetPasswordPage;
