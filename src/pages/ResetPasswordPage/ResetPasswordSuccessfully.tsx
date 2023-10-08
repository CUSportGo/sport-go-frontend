import React from "react";
import "./ResetPassword.css";
import { NavLink } from "react-router-dom";

function ResetPasswordSuccessfully() {
  return (
    <div className="resetSuccessPage">
      <div className="resetSuccessPage-logoName">
        SPORT <span className="go-text"> GO</span>
      </div>
      <div className="resetSuccessPage-block">
        <h1>Your Password is reset!</h1>
        <p> you can now login with your new password</p>
        <NavLink to="/" className="registerButton">
          Back to Login
        </NavLink>
      </div>
    </div>
  );
}

export default ResetPasswordSuccessfully;
