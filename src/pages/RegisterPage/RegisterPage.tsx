import { useState } from "react";
import "./RegisterPage.css";
import { Button, Form, Input, message } from "antd";

const RegisterPage = () => {
  return (
    <div className="registerPage-mainPage">
      <div className="form-container">
        <Form
          style={{
            width: 250,
            margin: "auto",
            // display: "flex",
            // flexDirection: "column",
            // alignItems: "center",
          }}
          layout="vertical"
        >
          <div className="register-n-image">
            <h1 className="register-label">Register</h1>
          </div>
          <Form.Item label="Firstname" name="firstname">
            <Input placeholder="Firstname" />
          </Form.Item>
          <Form.Item label="Lastname" name="lastname">
            <Input placeholder="Lastname" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Phone number" name="Phonenumber">
            <Input placeholder="Phone number" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item label="Confirm password" name="confirmpassword">
            <Input.Password placeholder="Confirm password" />
          </Form.Item>
          <Form.Item>
            <Button>Register</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
