import { FC } from "react";
import "./ResetPassword.css";

interface ResetPasswordProp {
  password: string;
  confirmPassword: string;
  handlePasswordChange: (newPassword: string) => void;
  handleConfirmPasswordChange: (newConfirmPassword: string) => void;
  handleResetPasswordOnClick: () => void;
}

const ResetPassword: FC<ResetPasswordProp> = ({
  password,
  confirmPassword,
  handlePasswordChange,
  handleConfirmPasswordChange,
  handleResetPasswordOnClick,
}) => {
  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <div className="reset-password-input-section">
        <p>Password</p>
        <input
          className="reset-password-input"
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
      </div>
      <div className="reset-password-input-section">
        <p>Confirm Password</p>
        <input
          className="reset-password-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
        />
      </div>
      <button className="reset-password-button" onClick={handleResetPasswordOnClick}>
        Reset password
      </button>
    </div>
  );
};

export default ResetPassword;