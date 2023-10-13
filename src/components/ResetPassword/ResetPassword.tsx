import { Button, Form, Input } from "antd";
import "./ResetPassword.css";

interface ResetPasswordProp {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const handleResetPasswordOnFinish = (values: ResetPasswordProp) => {
    console.log(values);
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <Form
        name="reset-password-form"
        className="reset-password-form"
        onFinish={handleResetPasswordOnFinish}
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
          <Input.Password className="reset-password-input" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
          ]}
        >
          <Input.Password className="reset-password-input" />
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
