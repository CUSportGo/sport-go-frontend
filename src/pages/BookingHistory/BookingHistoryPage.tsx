import React, { useEffect } from "react";
import "./BookingHistoryPage.css";

function BookingHistoryPage() {
  const data = {
    name: "Sport Complex",
    type: "Badminton",
    areaName: "Area1",
    date: "05 Nov 2023",
    from: "24.00",
    to: "24.00",
  };

  const datas = [];
  for (let i = 0; i < 6; i++) {
    datas.push(data);
  }

  return (
    <div className="bookingHistoryPage-container">
      <h1 className="historyPage-head"> Booking History</h1>
      <div className="historyPage-allList">
        <div className="statusHead"> Pending </div>
        <div className="statusList">
          {datas.map((data, index) => (
            <div className="pending">
              <div className="pic"></div>
              <div className="detail">
                <div> {data.name}</div>
                <div className="type"> {data.type}</div>
                <div> {data.areaName}</div>
                <div className="small">
                  Date : <span>{data.date}</span>
                </div>
                <div className="small">
                  From : <span>{data.from}</span> To : <span>{data.to}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="statusHead"> Accept </div>
        <div className="statusList">
          {datas.map((data, index) => (
            <div className="accept">
              <div className="pic"></div>
              <div className="detail">
                <div> {data.name}</div>
                <div className="type"> {data.type}</div>
                <div> {data.areaName}</div>
                <div className="small">
                  Date : <span>{data.date}</span>
                </div>
                <div className="small">
                  From : <span>{data.from}</span> To : <span>{data.to}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="statusHead"> Decline </div>
        <div className="statusList">
          {datas.map((data, index) => (
            <div className="decline">
              <div className="pic"></div>
              <div className="detail">
                <div> {data.name}</div>
                <div className="type"> {data.type}</div>
                <div> {data.areaName}</div>
                <div className="small">
                  Date : <span>{data.date}</span>
                </div>
                <div className="small">
                  From : <span>{data.from}</span> To : <span>{data.to}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="statusHead"> Cancel </div>
        <div className="statusList">
          {datas.map((data, index) => (
            <div className="cancel">
              <div className="pic"></div>
              <div className="detail">
                <div> {data.name}</div>
                <div className="type"> {data.type}</div>
                <div> {data.areaName}</div>
                <div className="small">
                  Date : <span>{data.date}</span>
                </div>
                <div className="small">
                  From : <span>{data.from}</span> To : <span>{data.to}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookingHistoryPage;
