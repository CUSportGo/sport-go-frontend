import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import Logo from "../../pictures/sport_go_logo.svg";
import account from "../../pictures/account.png";

const Navbar = () => {
  const [accountOption, setAccountOption] = useState(false);
  const handleClickAccount = () => {
    setAccountOption(!accountOption);
  };
  return (
    <>
      <nav className="nav">
        <ul className="menu-list-left">
          <li className="title-li">
            <img src={Logo} alt="sport_go_logo"></img>
          </li>
        </ul>
        <ul className="menu-list-right">
          <NavLink to="/" className="noti-li">
            Home
          </NavLink>

          <NavLink to="/reserve" className="username-li">
            My Reservation
          </NavLink>
          <NavLink to="/history" className="username-li">
            History
          </NavLink>

          <li className="account-li" onClick={handleClickAccount}>
            <img src={account} alt="account"></img>
          </li>
        </ul>
      </nav>
      {accountOption && (
        <div className="accountOptionList">
          <NavLink to="/profile" className="profileOption">
            Your Profile
          </NavLink>
          <NavLink to="/login" className="logoutOption">
            Logout
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Navbar;
