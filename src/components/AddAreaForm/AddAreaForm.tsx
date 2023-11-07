import "./AddAreaForm.css";
import { Button, Form, Input, Select, InputNumber } from "antd";

const AddAreaForm = () => {
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
        onFinish={() => {}}
      >
        <Form.Item
          label="Name"
          name="name"
          style={{ marginBottom: "12px" }}
          rules={[
            {
              required: true,
              message: "Please input area name",
            },
          ]}
        >
          <Input style={{width: "200px"}} placeholder="name" />
        </Form.Item>
        <Form.Item
          name="time"
          style={{ marginBottom: "12px" }}
          rules={[
            {
              required: true,
              message: "Please input open / close time",
            },
          ]}
        >
          <Form.Item
            label="Open Time"
            name="open"
            style={{ display: "inline-block", marginRight: "30px",marginBottom: 0 }}
          >
            <Select
              defaultValue="0:00"
              options={[
                { value: "0:00", label: "0:00" },
                { value: "1:00", label: "1:00" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Close Time"
            name="close"
            style={{ display: "inline-block",marginBottom: 0 }}
          >
            <Select
              defaultValue="0:00"
              options={[
                { value: "0:00", label: "0:00" },
                { value: "1:00", label: "1:00" },
              ]}
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
      </Form>
    </div>
  );
};

export default AddAreaForm;
