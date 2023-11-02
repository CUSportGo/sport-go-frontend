import React from "react";
import "./ResetPassword.css";
import { NavLink } from "react-router-dom";
import Logo from "../../pictures/sport_go_logo.svg";

function ResetPasswordSuccessfully() {
  return (
    <div className="resetSuccessPage">
      <div className="resetPasswordPage-logoName">
        <img src={Logo} alt="SportGoLogo" />
      </div>
      <div className="resetSuccessPage-block">
        <div className="resetSuccessPage-pic"></div>
        <h2>Reset password successfully</h2>
        <NavLink to="/login" className="resetSuccessPage-backToLogin">
          Back To Login
        </NavLink>
      </div>
    </div>
  );
}

export default ResetPasswordSuccessfully;
