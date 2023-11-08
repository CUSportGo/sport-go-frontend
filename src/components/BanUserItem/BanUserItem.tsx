import React, { useState } from "react";
import "./BanUserItem.css";
import Button from "../Buttons/Button";

interface props {
  firstname: string;
  lastname: string;
  tel: string;
  email: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isBanned?: boolean;
}

const BanUserItem: React.FC<props> = ({
  firstname,
  lastname,
  tel,
  email,
  onClick,
  isBanned,
}) => {
  return (
    <div className="userInfo-container">
      <div className="username-text-banPage">
        {firstname} <span style={{ marginLeft: "20px" }}>{lastname}</span>
      </div>
      <div className="email-text-banPage">{email}</div>
      <div className="tel-text-banPage">{tel}</div>
      <div className="button-ban">
        {isBanned ? (
          <Button
            type="button"
            message={"Ban"}
            bgColor="#DD5858"
            fontSize="20px"
            bheight="30px"
            bwidth="119px"
            onClick={onClick}
          ></Button>
        ) : (
          <Button
            type="button"
            message={"Unban"}
            bgColor="#59CC59"
            fontSize="20px"
            bheight="30px"
            bwidth="119px"
            onClick={onClick}
          ></Button>
        )}
      </div>
    </div>
  );
};

export default BanUserItem;
