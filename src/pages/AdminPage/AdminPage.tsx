import React, { useEffect, useState } from "react";
import "./AdminPage.css";
import BanUserItem from "../../components/BanUserItem/BanUserItem";
import PopupConfirm from "../../components/PopupConfirm/PopupConfirm";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { apiClient } from "../../utils/clients";
import { User } from "../../types/user.dto";
import classnames from "classnames";

const AdminPage = () => {
  const [activeUser, setActiveUser] = useState<User[]>([
    {
      email: "blebike@hotmail.com",
      firstName: "begleza",
      lastName: "byet",
      status: "ACTIVE",
      id: 1,
      phoneNumber: "0987",
      role: "User",
    },
  ]);
  const [bannedUser, setBannedUser] = useState<User[]>([
    {
      email: "zuka@hotmail.com",
      firstName: "zuka",
      lastName: "byet",
      status: "BANNED",
      id: 1,
      phoneNumber: "0987",
      role: "User",
    },
  ]);
  const [displayUser, setDisplayUser] = useState<User[]>(activeUser);

  const getAllUser = async () => {
    setLoading(true);
    await apiClient.getAllUser().then((res) => {
      const users: User[] = res.data;
      const activeUsers = users.filter((user) => user.status === "ACTIVE");
      const bannedUsers = users.filter((user) => user.status === "BANNED");
      setActiveUser(activeUsers);
      setBannedUser(bannedUsers);
      console.log(res);
    });
    setLoading(false);
  };

  const [someoneGotBan, setSomeoneGotBan] = useState(false);
  const [userIdToBan, setUserIdToBan] = useState<any>();

  const handleBanUser = async (userId: string) => {
    setLoading(true);
    // ban by api
    setSomeoneGotBan(!someoneGotBan);
    setUserIdToBan("");

    setLoading(false);
  };

  const [loading, setLoading] = useState<boolean>();

  const [isUnBannedUser, setIsUnBannedUser] = useState(true);
  function handleUnbannedOrBannedClick(userPermission: boolean) {
    console.log(userPermission);
    if (isUnBannedUser == false) {
      setDisplayUser(activeUser);
    }
    if (isUnBannedUser == true) {
      setDisplayUser(bannedUser);
    }

    if (isUnBannedUser !== userPermission) {
      setIsUnBannedUser(userPermission);
    }
  }

  const checkStatusUser = (status: string) => {
    if (status === "ACTIVE") return true;
    else if (status === "BANNED") return false;
  };
  const [email, setEmail] = useState<string>();
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    // getAllUser();
  }, [someoneGotBan, email]);

  return (
    <div className="AdminPage-mainPage">
      <div className="searchUserSection">
        Search
        <input
          className="searchUserInput"
          type="text"
          placeholder="Search for email"
          value={email}
          onChange={handleSearchInputChange}
        />
      </div>

      <div className="AdminPage-topPanel">
        <div className="AdminPage-listOfUser">List of users</div>
        <div className="button-panel-banPage">
          <div
            onClick={() => {
              handleUnbannedOrBannedClick(!isUnBannedUser);
            }}
            className={classnames("button-UnBannedUser", {
              clicked: isUnBannedUser,
            })}
          >
            Active Account
          </div>
          <div
            onClick={() => {
              handleUnbannedOrBannedClick(!isUnBannedUser);
            }}
            className={classnames("button-BannedUser", {
              clicked: !isUnBannedUser,
            })}
          >
            Banned Account
          </div>
        </div>
      </div>

      <div className="AdminPage-userContainer">
        <div className="title-panel">
          <div className="title-username-banPage">Username</div>
          <div className="title-email-banPage">Email</div>
          <div className="title-tel-banPage">Phone Number</div>
          <div className="title-ban-banPage">Ban</div>
        </div>
        {displayUser.length !== 0 ? (
          displayUser.map((userInfo: User) => (
            <div key={userInfo.id} className="user-info-container">
              <BanUserItem
                firstname={userInfo.firstName}
                lastname={userInfo.lastName}
                tel={userInfo.phoneNumber}
                email={userInfo.email}
                onClick={() => {
                  setUserIdToBan(userInfo.id);
                }}
                isBanned={checkStatusUser(userInfo.status)}
              />
              {userIdToBan === userInfo.id && (
                <div className="popupConfirmBan">
                  <PopupConfirm
                    description={
                      checkStatusUser(userInfo.status)
                        ? `Are you sure you want to ban ${userInfo.firstName}?`
                        : `Are you sure you want to unban ${userInfo.firstName}?`
                    }
                    confirmMessage="Confirm"
                    onConfirm={() => handleBanUser(userIdToBan)}
                    onCancel={() => setUserIdToBan("")}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="nothing-here">No User</div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
