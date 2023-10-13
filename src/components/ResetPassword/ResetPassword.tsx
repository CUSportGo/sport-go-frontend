import { Button, Form, Input } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ResetPasswordRequestDto } from "../../types/auth.dto";
import { apiClient } from "../../utils/clients";
import { commonUtils } from "../../utils/common";
import "./ResetPassword.css";

interface ResetPasswordProp {
  password: string;
  confirmPassword: string;
}

const ResetPassword: FC<{ token: string }> = ({ token }) => {
  const navigate = useNavigate();

  const handleResetPasswordOnFinish = async (values: ResetPasswordProp) => {
    const request: ResetPasswordRequestDto = {
      password: values.password,
      accessToken: token,
    };
    await apiClient
      .resetPassword(request)
      .then((res) => {
        navigate("/resetsuc");
      })
      .catch((error) => {
        console.log(error);
      });
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
            {
              validator: commonUtils.validatePassword,
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
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The password do not match"));
              },
            }),
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
