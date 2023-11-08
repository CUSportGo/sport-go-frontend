import { useState } from "react";
import "./AddAreaForm.css";
import { Button, Form, Input, Select, InputNumber, SelectProps } from "antd";
import { SportTypeEnum } from "../../utils/enums/sportType.enums";

const AddAreaForm = () => {
  const timeOptions = Array.from({ length: 24 }, (_, hour) => ({
    value: hour,
    label: `${hour}:00`,
  }));

  const sportTypeOptions: SelectProps["options"] = Object.values(
    SportTypeEnum
  ).map((item) => {
    return { label: item, value: item };
  });

  const [openTime, setOpenTime] = useState(0);

  const onFinish = (values: any) => {
    const data = {
      name: values.areaname,
      openTime: `${values.open}:00`,
      closeTime: `${values.close}:00`,
      price: values.price.toString(),
    };
    console.log(data);
  };

  return (
    <div>
      <Form
        style={{
          width: "100%",
          border: "1px solid #E5E5E5",
          borderRadius: "10px",
          fontFamily: "Poppins",
          padding: "30px",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="areaname"
          style={{ marginBottom: "12px" }}
          rules={[
            {
              required: true,
              message: "Please input area name",
            },
          ]}
        >
          <Input placeholder="name" />
        </Form.Item>
        <Form.Item
          label="Sport Type"
          name="sporttype"
          style={{ marginBottom: "16px" }}
          rules={[{ required: true, message: "Please select a sport type" }]}
        >
          <Select
            style={{ width: "100%" }}
            placeholder="Please select"
            options={sportTypeOptions}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "12px" }}>
          <Form.Item
            label="Open Time"
            name="open"
            style={{
              display: "inline-block",
              marginRight: "30px",
              marginBottom: 0,
            }}
            rules={[
              {
                required: true,
                message: "Please input opene time",
              },
            ]}
          >
            <Select
              style={{ width: "100px" }}
              options={timeOptions}
              placeholder="0:00"
              onChange={(value) => setOpenTime(parseInt(value))}
            />
          </Form.Item>
          <Form.Item
            label="Close Time"
            name="close"
            style={{ display: "inline-block", marginBottom: 0 }}
            rules={[
              {
                required: true,
                message: "Please input close time",
              },
            ]}
          >
            <Select
              style={{ width: "100px" }}
              placeholder="0:00"
              options={timeOptions.filter((time) => time.value > openTime)}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Price per hour"
          name="price"
          style={{ marginBottom: "12px" }}
          rules={[
            {
              required: true,
              message: "Please input price",
            },
          ]}
        >
          <InputNumber placeholder="price" />
        </Form.Item>
        <Form.Item
          name="addareabutton"
          className="add-area-item-button"
          style={{ marginBottom: 0 }}
        >
          <Button className="add-area-button" htmlType="submit">
            Add area
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddAreaForm;
