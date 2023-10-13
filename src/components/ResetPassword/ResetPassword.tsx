import { Button, Form, Input } from "antd";
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
      <Form
        name="reset-password-form"
        className="reset-password-form"
        onFinish={handleResetPasswordOnClick}
        layout="vertical"
      >
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password
            className="reset-password-input"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="confirm-password"
          label="Confirm Password"
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
          ]}
        >
          <Input.Password
            className="reset-password-input"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="reset-password-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
