import React, { useEffect, useState } from "react";
import "./BookingHistoryPage.css";
import { apiClient } from "../../utils/clients";
import cancelPic from "../../pictures/cancel.png";

function BookingHistoryPage() {
  const [pending, setPending] = useState([]);
  const [accept, setAccept] = useState([]);
  const [decline, setDecline] = useState([]);
  const [cancel, setCancel] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      await apiClient
        .getBookingHistory()
        .then((res) => {
          setPending(res.data.data.pending);
          setAccept(res.data.data.accept);
          setDecline(res.data.data.decline);
          setCancel(res.data.data.cancel);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchHistory();
  }, []);

  return (
    <div className="bookingHistoryPage-container">
      <h1 className="historyPage-head"> Booking History</h1>
      <div className="historyPage-allList">
        <div className="statusHead"> Pending </div>
        <div className="statusList">
          {pending.map((data, index) => (
            <div className="pending">
              <div className="pic"></div>
              <div className="detail">
                <div> {data.name}</div>
                <div className="type"> {data.type}</div>
                <div> {data.areaName}</div>
                <div className="small">
                  Date : <span>{data.date}</span>
                  <span onClick={apiClient.cancelBooking(data.areaid)}>
                    <img src={cancelPic}></img>
                  </span>
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
          {accept.map((data, index) => (
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
          {decline.map((data, index) => (
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
          {cancel.map((data, index) => (
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
