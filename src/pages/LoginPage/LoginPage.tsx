import React, { useState } from "react";
import "./LoginPage.css";
import classnames from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { apiClient } from "../../utils/clients";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    setIsValidEmail(emailPattern.test(inputEmail));
  };

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await apiClient
      .postLogin({ email, password })
      .then((res) => {
        alert("Login successful");
        navigate("/");
      })
      .catch((err) => {
        setError(true);
      });
  };

  const handleGoogleClick = () => {
    window.location.href = "https://www.google.com";
  };

  const handleFacebookClick = () => {
    window.location.href = "https://www.facebook.com";
  };

  return (
    <div className="LoginPage-mainPage">
      <div className="LoginPage-logoName">
        SPORT <span className="go-text"> GO</span>
      </div>

      <form className="LoginPage-loginPanel">
        <div className="LoginPage-loginText">LOGIN</div>

        <div className="Login-box">
          <div className="LoginPage-emailText">Email</div>
          <input
            className={classnames("input-login", { invalid: isError })}
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          {!isValidEmail && (
            <p className="error-text">Please enter a valid email address</p>
          )}

          <div className="LoginPage-passwordText">Password</div>
          <input
            className={classnames("input-login", { invalid: isError })}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="LoginPage-forgotPasswordtext">
            <NavLink to="/" className="forgotpasswordButton">
              Forgot Password?
            </NavLink>
          </p>
          {isError ? (
            <label className="error-text">username or password incorrect</label>
          ) : (
            ""
          )}

          <div className="login-button">
            <Button
              message="Log in"
              borderRadius="5px"
              bwidth="200px"
              bheight="40px"
              bgColor="#5729CE"
              fontSize="16px"
              onClick={(e) => {
                handleLogin(e);
              }}
            ></Button>
          </div>

          <div className="or-line-toLogin">
            <div className="line-underLogin"></div>
            <div className="line-text">OR</div>
            <div className="line-underLogin"></div>
          </div>

          <div className="o-auth-panel">
            <div className="o-auth-icon" onClick={handleGoogleClick}>
              <FcGoogle style={{ width: 30, height: 30 }} />
            </div>
            <div className="o-auth-icon" onClick={handleFacebookClick}>
              <BsFacebook style={{ width: 30, height: 30, color: "1877F2" }} />
            </div>
          </div>

          <p className="LoginPage-registertext">
            Don’t you have an account?
            <NavLink to="/register" className="registerButton">
              register
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
