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
