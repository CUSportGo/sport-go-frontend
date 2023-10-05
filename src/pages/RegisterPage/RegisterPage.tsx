import { useState } from "react";
import "./RegisterPage.css";
import { Button, Form, Input, Select, message } from "antd";
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { Store } from "antd/es/form/interface";
import { UserType } from "../../utils/enums/usertype.enums";
import { apiClient } from "../../utils/clients";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const navigate = useNavigate();

  const { Option } = Select;

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    console.log(info.file);

    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const validatePhoneFormat = (
    _: any,
    value: string,
    callback: (message?: string) => void
  ) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; // Regular expression for xxx-xxx-xxxx format

    if (!phoneRegex.test(value) && value !== "" && value !== undefined) {
      callback("Number should be in the format xxx-xxx-xxxx");
    } else {
      callback(); // Validation passed
    }
  };

  const validatePassword = (_:any, value: string) => {
    if (!value) {
      return Promise.resolve();
    }
    // Check for at least 1 uppercase letter
    if (!/[A-Z]/.test(value)) {
      return Promise.reject('Password must contain at least 1 uppercase letter');
    }
  
    // Check for at least 1 lowercase letter
    if (!/[a-z]/.test(value)) {
      return Promise.reject('Password must contain at least 1 lowercase letter');
    }
  
    // Check for at least 1 number
    if (!/\d/.test(value)) {
      return Promise.reject('Password must contain at least 1 number');
    }
  
    // Check the length of the password
    if (value.length < 8) {
      return Promise.reject('Password must be at least 8 characters long');
    }
  
    return Promise.resolve();
  };

  const onFinish = async (values: Store) => {
    const data = {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      phoneNumber: values.phonenumber,
      password: values.password,
      role: values.role,
    };
    await apiClient.postRegister(data).then((res) => {
      navigate("/login");
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="registerPage-mainPage">
      <div className="RegisterPage-logoName">
        SPORT <span className="go-text"> GO</span>
      </div>
      <div className="form-container">
        <Form
          style={{
            width: 250,
            margin: "auto",
            fontFamily: "Poppins",
          }}
          layout="vertical"
          onFinish={onFinish}
        >
          <div className="register-n-image">
            <p className="register-label">Register</p>
            <Form.Item name="image" style={{ marginBottom: "8px" }}>
              <div className="upload-image">
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
            </Form.Item>
          </div>

          <Form.Item
            label="Firstname"
            name="firstname"
            style={{ marginBottom: "8px" }}
            rules={[
              {
                required: true,
                message: "Please input your Firstname",
              },
            ]}
          >
            <Input placeholder="Firstname" />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="lastname"
            style={{ marginBottom: "8px" }}
            rules={[
              {
                required: true,
                message: "Please input your Lastname",
              },
            ]}
          >
            <Input placeholder="Lastname" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            style={{ marginBottom: "8px" }}
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phonenumber"
            style={{ marginBottom: "8px" }}
            rules={[
              {
                required: true,
                message: "Please input your Phone number",
              },
              {
                validator: validatePhoneFormat,
              },
            ]}
          >
            <Input placeholder="xxx-xxx-xxxx" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            style={{ marginBottom: "8px" }}
            rules={[
              {
                required: true,
                message: "Please input your Password",
              },
              {
                validator: validatePassword,
              }
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Confirm password"
            name="confirmpassword"
            style={{ marginBottom: "8px" }}
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
                  return Promise.reject(
                    new Error("The password that you entered do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            style={{ marginBottom: "28px" }}
            rules={[
              { required: true, message: "Please select your role" },
            ]}
          >
            <Select placeholder="Select a role" >
              <Option value={UserType.USER}>User</Option>
              <Option value={UserType.SPORTAREA}>Sport Area</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="registerbutton"
            className="register-item-button"
            style={{ marginBottom: "11px" }}
          >
            <Button className="register-button" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <p className="RegisterPage-logintext">
            Already have an account?{" "}
            <NavLink to="/login" className="login-text">
              login
            </NavLink>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
