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
import Logo from "../../pictures/sport_go_logo.svg";
import { commonUtils } from "../../utils/common";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const navigate = useNavigate();
  const { Option } = Select;

  const handleUploadFileChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    const blobObj = new Blob([info.file as RcFile], { type: info.file.type });
    const fileObj = new File([blobObj], info.file.name, {
      type: info.file.type,
    });
    setImage(fileObj);
    setImageUrl(URL.createObjectURL(fileObj));
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const validateImage = (file: File) => {
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

  const onFinish = async (values: Store) => {
    const formData = new FormData();
    formData.append("firstName", values.firstname);
    formData.append("lastName", values.lastname);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phonenumber);
    formData.append("password", values.password);
    formData.append("role", values.role);
    if (image && validateImage(image)) {
      formData.append("file", image);
    }
    await apiClient
      .postRegister(formData)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 409) {
          setErrorMsg("Email already exists");
        }
      });
  };

  const UploadButton = () => {
    return (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
  };

  return (
    <div className="registerPage-mainPage">
      <div className="RegisterPage-logoName">
        <img src={Logo} alt="SportGoLogo" />
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
                  beforeUpload={() => {
                    return false;
                  }}
                  onChange={handleUploadFileChange}
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
                    <UploadButton />
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
                validator: commonUtils.validatePassword,
              },
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
            rules={[{ required: true, message: "Please select your role" }]}
          >
            <Select placeholder="Select a role">
              <Option value={UserType.USER}>User</Option>
              <Option value={UserType.SPORTAREA}>Sport Area</Option>
            </Select>
          </Form.Item>
          {errorMsg != "" && (
            <p className="RegisterPage-errorMsg">{errorMsg}</p>
          )}
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
