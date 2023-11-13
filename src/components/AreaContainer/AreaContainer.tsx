import { useState } from "react";
import "./AreaContainer.css";
import {
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  SelectProps,
  Space,
  Collapse,
} from "antd";
import { SportTypeEnum } from "../../utils/enums/sportType.enums";
import { AddSportAreaRequest, SportList } from "../../types/sportarea.dto";
import { apiClient } from "../../utils/clients";
import { useNavigate } from "react-router-dom";

interface AreaContainerProp {
  sportAreaId: string;
  sportList: SportList[];
}

interface AreaItemProp {
  sportItem: SportList;
}

interface AddAreaFormProp {
  sportAreaId: string;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddAreaForm: React.FC<AddAreaFormProp> = ({sportAreaId,setIsAdding}) => {
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

  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const data: AddSportAreaRequest = {
      name: values.areaname,
      openTime: `${values.open}:00`,
      closeTime: `${values.close}:00`,
      price: values.price.toString(),
      sportType: values.sporttype,
    };
    // console.log(data);
    await apiClient.addSportArea(sportAreaId,data).then((res) => {
      // console.log(res);
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    });
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
          <Button className="cancel-area-button" onClick={()=>{setIsAdding(false)}}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const AreaItem: React.FC<AreaItemProp> = ({ sportItem }) => {
  return (
    <Collapse
      collapsible="header"
      className="area-item-container"
      items={[
        {
          key: "1",
          label: sportItem.sportType,
          children: (
            <div>
              {sportItem.area.map((area) => (
                <div>- {area.name}</div>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
};

const AreaContainer: React.FC<AreaContainerProp> = ({
  sportAreaId,
  sportList,
}) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="area-container">
      <p>Sport Area Type</p>
      {!isAdding ? (
        <Button
          className="add-area-button"
          style={{ marginBottom: "12px" }}
          onClick={() => {
            setIsAdding(!isAdding);
          }}
        >
          Add sport area
        </Button>
      ) : (
        <AddAreaForm sportAreaId={sportAreaId} setIsAdding={setIsAdding}/>
      )}
      <br/>
      <Space direction="vertical" className="area-sportarea-section">
        {sportList &&
          sportList.length > 0 &&
          sportList.map((sport: SportList) => (
            <AreaItem sportItem={sport} />
          ))}
      </Space>
    </div>
  );
};

export default AreaContainer;
