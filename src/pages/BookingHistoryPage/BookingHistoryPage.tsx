import React, { useEffect, useState } from "react";
import "./BookingHistoryPage.css";
import { apiClient } from "../../utils/clients";
import cancelPic from "../../pictures/cancel.png";

function BookingHistoryPage() {
  const mockHistory = {
    pending: [
      {
        id: "id",
        sportAreaID: "said",
        sportType: "sportType",
        areaID: "aid",
        userID: "uid",
        startAt: "10/28/2023, 10.00.00 AM",
        endAt: "10/28/2023, 11.00.00 AM",
        status: 0,
        sportAreaData: { id: "id", name: "name", desciption: "description", images: ["1", "2"] },
        areaName: "areaName",
      },
    ],

    accept: [
      {
        id: "id",
        sportAreaID: "said",
        sportType: "sportType",
        areaID: "aid",
        userID: "uid",
        startAt: "10/28/2023, 10.00.00 AM",
        endAt: "10/28/2023, 11.00.00 AM",
        status: 0,
        sportAreaData: { id: "id", name: "name", desciption: "description", images: ["1", "2"] },
        areaName: "areaName",
      },
    ],
    decline: [
      {
        id: "id",
        sportAreaID: "said",
        sportType: "sportType",
        areaID: "aid",
        userID: "uid",
        startAt: "10/28/2023, 10.00.00 AM",
        endAt: "10/28/2023, 11.00.00 AM",
        status: 0,
        sportAreaData: { id: "id", name: "name", desciption: "description", images: ["1", "2"] },
        areaName: "areaName",
      },
    ],
    cancel: [
      {
        id: "id",
        sportAreaID: "said",
        sportType: "sportType",
        areaID: "aid",
        userID: "uid",
        startAt: "10/28/2023, 10.00.00 AM",
        endAt: "10/28/2023, 11.00.00 AM",
        status: 0,
        sportAreaData: { id: "id", name: "name", desciption: "description", images: ["1", "2"] },
        areaName: "areaName",
      },
    ],
  };
  const [history, setHistory] = useState(mockHistory);

  useEffect(() => {
    const fetchHistory = async () => {
      await apiClient
        .getBookingHistory()
        .then((res) => {
          setHistory(res.data.data);
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
          {history.pending.map((data, index) => (
            <div className="pending">
              <img className="pic" src={data.sportAreaData.images[0]}></img>
              <div className="detail">
                <div> {data.sportAreaData.name}</div>
                <div className="type"> {data.sportType}</div>
                <div> {data.areaName}</div>
                <div className="small">
                  Date : <span>{data.startAt.slice(0, 10)}</span>
                  <span
                    onClick={() => {
                      apiClient.cancelBooking(data.id);
                    }}
                  >
                    <img src={cancelPic} className="cancelPic"></img>
                  </span>
                </div>
                <div className="small">
                  From : <span>{data.startAt.slice(12, 17)}</span> To :
                  <span>{data.endAt.slice(12, 17)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="statusHead"> Accept </div>
        <div className="statusList">
          {history.accept.map((data, index) => (
            <div className="accept">
              <img className="pic" src={data.sportAreaData.images[0]}></img>
              <div className="detail">
                <div> {data.sportAreaData.name}</div>
                <div className="type"> {data.sportType}</div>
                <div> {data.areaName}</div>
                <div className="small">
                  Date : <span>{data.startAt.slice(0, 10)}</span>
                </div>
                <div className="small">
                  From : <span>{data.startAt.slice(12, 17)}</span> To :{" "}
                  <span>{data.endAt.slice(12, 17)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="statusHead"> Decline </div>
        <div className="statusList">
          {history.decline.map((data, index) => (
            <div className="decline">
              <img className="pic" src={data.sportAreaData.images[0]}></img>
              <div className="detail">
                <div> {data.sportAreaData.name}</div>
                <div className="type"> {data.sportType}</div>
                <div> {data.areaName}</div>
                <div className="small">
                  Date : <span>{data.startAt.slice(0, 10)}</span>
                </div>
                <div className="small">
                  From : <span>{data.startAt.slice(12, 17)}</span> To :{" "}
                  <span>{data.endAt.slice(12, 17)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="statusHead"> Cancel </div>
        <div className="statusList">
          {history.cancel.map((data, index) => (
            <div className="cancel">
              <img className="pic" src={data.sportAreaData.images[0]}></img>
              <div className="detail">
                <div> {data.sportAreaData.name}</div>
                <div className="type"> {data.sportType}</div>
                <div> {data.areaName}</div>
                <div className="small">
                  Date : <span>{data.startAt.slice(0, 10)}</span>
                </div>
                <div className="small">
                  From : <span>{data.startAt.slice(12, 17)}</span> To :{" "}
                  <span>{data.endAt.slice(12, 17)}</span>
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
