import "./BookingContainer.css";
import { AreaDetail, SportList } from "../../types/sportarea.dto";
import { Button, Collapse, DatePicker, Form, Select, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Option } from "antd/es/mentions";
import { BookingTimeSlot, GetAvailableBookingResponse } from "../../types/booking.dto";

interface BookingContainerProp {
  sportList: SportList[];
}

interface BookingSportItemProp {
  sportItem: SportList;
}

interface BookingSportFormProp {
  areas: AreaDetail[];
}

const mockTimeslot: GetAvailableBookingResponse = {
  timeslots: [
    {
      startTime: "10/31/2023, 08:00",
      endTime: "10/31/2023, 09:00",
    },
    {
      startTime: "10/31/2023, 09:00",
      endTime: "10/31/2023, 10:00",
    },
    {
      startTime: "10/31/2023, 10:00",
      endTime: "10/31/2023, 11:00",
    },
  ],
};

const BookingSportForm: React.FC<BookingSportFormProp> = ({ areas }) => {
  const [form] = Form.useForm<{ date: Dayjs | null; area: string }>();
  const date = Form.useWatch("date", form)?.format("YYYY-MM-DD");
  const areaId = Form.useWatch("area", form);

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
      setTimeSlot(mockTimeslot.timeslots);
      const timeSlotStr: string[] = mockTimeslot.timeslots.map((timeslot: BookingTimeSlot) => {
        return `${dayjs(timeslot.startTime).format("HH:mm")} - ${dayjs(timeslot.endTime).format(
          "HH:mm"
        )}`;
      });
      setTimeSlotString(timeSlotStr);
    }
  }, [date, areaId]);

  const onFinishBooking = () => {};

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
              name="time"
              label="Time slot"
              rules={[{ required: true, message: "Please select booking time slot" }]}
            >
              <Select placeholder="Select booking time slot">
                {timeSlotString.map((timeslot: string) => (
                  <Option value={timeslot}>{timeslot}</Option>
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

const BookingSportItem: React.FC<BookingSportItemProp> = ({ sportItem }) => {
  return (
    <Collapse
      collapsible="header"
      className="booking-sportarea-item-container"
      items={[
        {
          key: "1",
          label: sportItem.sportType,
          children: <BookingSportForm areas={sportItem.area} />,
          showArrow: false,
        },
      ]}
    />
  );
};

const BookingContainer: React.FC<BookingContainerProp> = ({ sportList }) => {
  return (
    <div className="booking-container">
      <p>Sport Area Type</p>
      <Space direction="vertical" className="booking-sportarea-section">
        {sportList &&
          sportList.length > 0 &&
          sportList.map((sport: SportList) => <BookingSportItem sportItem={sport} />)}
      </Space>
    </div>
  );
};

export default BookingContainer;
