import React, { useState } from "react";
import "./ViewPendingBookingPage.css";
import { useEffect } from "react";
import { apiClient } from "../../utils/clients";
import { useAuth } from "../../context/AuthProvider";
import { Booking } from "../../types/booking.dto";

function ViewPendingBookingPage() {
  const { user } = useAuth();

  const [booking, setBooking] = useState<Booking[]>();

  useEffect(() => {
    const fetchPending = async () => {
      await apiClient
        .getPending(user?.sportAreaId || "")
        .then((res) => {
          setBooking(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (user) {
      fetchPending();
    }
  }, []);

  return (
    <div className="viewPending-container">
      <div className="list">
        {booking?.map((data, index) => (
          <div className="block">
            <div className="areaid">{data.areaName}</div>
            <div className="userid">{data.userID}.slice(0,6)</div>
            <div className="info">
              <div className="row">
                From: <span>{data.startAt.slice(12, 17)}</span> To:{" "}
                <span>{data.endAt.slice(12, 17)}</span>
              </div>
              <div className="action">
                <button
                  className="accept"
                  onClick={() => {
                    apiClient.confirmBooking(data.id).catch((err) => {
                      console.log(err);
                    });
                  }}
                >
                  Accept
                </button>
                <button
                  className="decline"
                  onClick={() => {
                    apiClient.cancelBooking(data.id).catch((err) => {
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
