import "./BookingContainer.css";
import { AreaDetail, SportList } from "../../types/sportarea.dto";
import { Button, Collapse, DatePicker, Form, Select, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Option } from "antd/es/mentions";
import {
  BookingTimeSlot,
  CreateBookingRequest,
  GetAvailableBookingRequest,
  GetAvailableBookingResponse,
} from "../../types/booking.dto";
import { apiClient } from "../../utils/clients";
import { useNavigate } from "react-router-dom";

interface BookingContainerProp {
  sportAreaId: string;
  sportList: SportList[];
}

interface BookingSportItemProp {
  sportAreaId: string;
  sportItem: SportList;
}

interface BookingSportFormProp {
  sportAreaId: string;
  sportType: string;
  areas: AreaDetail[];
}

interface BookingSportFormValue {
  date: Dayjs | null;
  area: string;
  timeslot: string;
}

const BookingSportForm: React.FC<BookingSportFormProp> = ({ sportAreaId, sportType, areas }) => {
  const navigate = useNavigate();

  const [form] = Form.useForm<BookingSportFormValue>();
  const date = Form.useWatch("date", form)?.format("YYYY-MM-DD");
  const areaId = Form.useWatch("area", form);
  const timeSlotIndex = Form.useWatch("timeslot", form);

  const [selectArea, setSelectArea] = useState<AreaDetail | null>(null);
  const [timeSlot, setTimeSlot] = useState<BookingTimeSlot[]>([]);
  const [timeSlotString, setTimeSlotString] = useState<string[]>([]);

  useEffect(() => {
    for (let area of areas) {
      if (area.id == areaId) {
        setSelectArea(area);
        break;
      }
    }
  }, [areaId]);

  useEffect(() => {
    if (date && areaId) {
      // call request to get available booking
      const getAvailableBooking = async () => {
        const request: GetAvailableBookingRequest = {
          sportAreaId: sportAreaId,
          sportType: sportType,
          areaId: areaId,
          bookingDate: date,
        };
        apiClient
          .getAvailableBooking(request)
          .then((data: GetAvailableBookingResponse) => {
            setTimeSlot(data.listAvailableTime);
            const timeSlotStr: string[] = data.listAvailableTime.map(
              (timeslot: BookingTimeSlot) => {
                return `${dayjs(timeslot.startTime).format("HH:mm")} - ${dayjs(
                  timeslot.endTime
                ).format("HH:mm")}`;
              }
            );
            setTimeSlotString(timeSlotStr);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getAvailableBooking();
    }
  }, [date, areaId]);

  const onFinishBooking = async (value: BookingSportFormValue) => {
    const timeslot = timeSlot[parseInt(timeSlotIndex)];
    const startAt = timeslot.startTime;
    const endAt = timeslot.endTime;

    const startDateTime = new Date(startAt);
    const endDateTime = new Date(endAt);

    const request: CreateBookingRequest = {
      sportAreaID: sportAreaId,
      sportType: sportType,
      areaID: areaId,
      startAt: startDateTime.toISOString(),
      endAt: endDateTime.toISOString(),
    };

    await apiClient
      .createBooking(request)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Form form={form} onFinish={onFinishBooking}>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select booking date" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="area"
          label="Area"
          rules={[
            {
              required: true,
              message: "Please select booking area",
            },
          ]}
        >
          <Select placeholder="Select Area">
            {areas.map((area: AreaDetail) => (
              <Option value={area.id}>{area.name}</Option>
            ))}
          </Select>
        </Form.Item>
        {date && areaId && (
          <>
            <hr />
            <p style={{ marginLeft: "10px" }}>Price: {selectArea?.price} Baht/hour</p>
            <Form.Item
              name="timeslot"
              label="Time slot"
              rules={[{ required: true, message: "Please select booking time slot" }]}
            >
              <Select placeholder="Select booking time slot">
                {timeSlotString.map((timeslot: string, idx: number) => (
                  <Option value={idx.toString()}>{timeslot}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Book</Button>
            </Form.Item>
          </>
        )}
      </Form>
    </>
  );
};

const BookingSportItem: React.FC<BookingSportItemProp> = ({ sportAreaId, sportItem }) => {
  return (
    <Collapse
      collapsible="header"
      className="booking-sportarea-item-container"
      items={[
        {
          key: "1",
          label: sportItem.sportType,
          children: (
            <BookingSportForm
              sportAreaId={sportAreaId}
              sportType={sportItem.sportType}
              areas={sportItem.area}
            />
          ),
          showArrow: false,
        },
      ]}
    />
  );
};

const BookingContainer: React.FC<BookingContainerProp> = ({ sportAreaId, sportList }) => {
  return (
    <div className="booking-container">
      <p>Sport Area Type</p>
      <Space direction="vertical" className="booking-sportarea-section">
        {sportList &&
          sportList.length > 0 &&
          sportList.map((sport: SportList) => (
            <BookingSportItem sportAreaId={sportAreaId} sportItem={sport} />
          ))}
      </Space>
    </div>
  );
};

export default BookingContainer;
