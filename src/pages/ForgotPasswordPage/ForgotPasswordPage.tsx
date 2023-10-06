import React, { useState } from "react";
import "./ForgotPasswordPage.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const handleBackButton = () => {
    navigate("/login");
  };

  const handleSendEmail = () => {
    alert("Email was sent!");
  };

  return (
    <div className="ForgotPassword-mainPage">
      <div className="ForgotPassword-container">
        <div className="ForgotPassword-backButton" onClick={handleBackButton}>
          <MdArrowBackIosNew
            style={{
              color: "white",
              alignSelf: "center",
              display: "flex",
              marginRight: "2px",
            }}
          />
        </div>

        <form className="ForgotPassword-box">
          <div className="ForgotPassword-text">Forgot Password</div>
          <div className="ForgotPassword-emailText"> Email</div>

          <input
            className="ForgotPassword-emailForm"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="ForgotPassword-Button">
            <Button
              message={"Send Email"}
              onClick={handleSendEmail}
              bheight="40px"
              bwidth="200px"
              fontSize="16px"
              borderRadius="5px"
              bgColor="#5729CE"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
