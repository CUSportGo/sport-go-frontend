import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import Logo from "../../pictures/sport_go_logo.svg";
import account from "../../pictures/account.png";
import { apiClient } from "../../utils/clients";
import { useAuth } from "../../context/AuthProvider";
import { UserType } from "../../utils/enums/usertype.enums";

const Navbar = () => {
  const { user } = useAuth();
  const [accountOption, setAccountOption] = useState(false);
  const [userPic, setUserPic] = useState(account);
  const handleClickAccount = () => {
    setAccountOption(!accountOption);
  };
  const handleLogout = () => {
    apiClient.postLogout();
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      await apiClient
        .getUserProfile()
        .then((res) => {
          console.log(res.data);
          setUserPic(res.data.profileUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUserProfile();
  }, []);
  return (
    <>
      <nav className="nav">
        <ul className="menu-list-left">
          <li className="title-li">
            <img src={Logo} alt="sport_go_logo"></img>
          </li>
        </ul>
        <ul className="menu-list-right">
          <NavLink to="/">Home</NavLink>
          {user && user.role === UserType.USER && (
            <NavLink to="/history">History</NavLink>
          )}
          {user && user.role === UserType.SPORTAREA && (
            <NavLink to="/update-sportarea">Edit</NavLink>
          )}

          <li className="account-li" onClick={handleClickAccount}>
            <img src={userPic} alt="account"></img>
          </li>
        </ul>
      </nav>
      {accountOption && (
        <div className="accountOptionList">
          <NavLink to="/login" className="logoutOption" onClick={handleLogout}>
            Logout
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Navbar;
