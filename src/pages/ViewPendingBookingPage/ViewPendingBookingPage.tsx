import React, { useState } from "react";
import "./ViewPendingBookingPage.css";
import { useEffect } from "react";
import { apiClient } from "../../utils/clients";

function ViewPendingBookingPage() {
  const mockData = {
    data: [
      {
        id: "id",
        sportAreaID: "sid",
        sportType: "type",
        areaID: "aid",
        userID: "uid",
        startAt: "10/28/2023, 10.00.00 AM",
        endAt: "10/28/2023, 11.00.00 AM",
        status: 0,
        sportAreaData: {
          id: "1",
          name: "good",
          description: "description",
        },
      },
      {
        id: "id2",
        sportAreaID: "sid2",
        sportType: "type",
        areaID: "aid",
        userID: "uid",
        startAt: "10/28/2023, 10.00.00 AM",
        endAt: "10/28/2023, 11.00.00 AM",
        status: 0,
        sportAreaData: {
          id: "1",
          name: "good",
          description: "description",
        },
      },
    ],
  };

  const [booking, setBooking] = useState(mockData.data);

  // useEffect(() => {
  //   const fetchPending = async () => {
  //     await apiClient
  //       .getPending(id)
  //       .then((res) => {
  //         console.log(res);
  //         setBooking(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   fetchPending();
  // }, []);

  return (
    <div className="viewPending-container">
      <div className="list">
        {booking.map((data, index) => (
          <div className="block">
            <div className="areaid">{data.areaID}</div>
            <div className="userid">{data.userID}</div>
            <div className="info">
              <div className="row">
                From: <span>{data.startAt.slice(12, 17)}</span> To:{" "}
                <span>{data.endAt.slice(12, 17)}</span>
              </div>
              <div className="action">
                <button
                  className="accept"
                  onClick={() => {
                    apiClient.confirmBooking(data.areaID).catch((err) => {
                      console.log(err);
                    });
                  }}
                >
                  Accept
                </button>
                <button
                  className="decline"
                  onClick={() => {
                    apiClient.cancelBooking(data.areaID).catch((err) => {
                      console.log(err);
                    });
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPendingBookingPage;
