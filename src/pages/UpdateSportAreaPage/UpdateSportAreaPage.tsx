import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  SelectProps,
} from "antd";
import "./UpdateSportAreaPage.css";
import { Store } from "antd/es/form/interface";
import Upload, { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import MapComponent from "../../components/Map/MapComponent";
import { SportTypeEnum } from "../../utils/enums/sportType.enums";
import axios from "axios";
import { apiClient } from "../../utils/clients";
import { useNavigate } from "react-router-dom";
import { SportAreaResponseDto } from "../../types/sportarea.dto";
import { UserProfile } from "../../types/user.dto";

const mockProfile: UserProfile = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  profileUrl: "",
  role: "",
  sportAreaId: "6550f6ae593e37f99e8a5b1f",
};

interface UpdateSportAreaForm {
  name: string;
  description: string;
  sporttype: string[];
  price: number;
  facilities: string[];
  location: google.maps.LatLngLiteral;
}

const UpdateSportAreaPage = () => {
  const options: SelectProps["options"] = [
    { value: "carpark", label: "Car park" },
    { value: "shower", label: "Shower" },
  ];

  const sportTypeOptions: SelectProps["options"] = Object.values(
    SportTypeEnum
  ).map((item) => {
    return { label: item, value: item };
  });

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const [sportAreaInfo, setSportAreaInfo] = useState<SportAreaResponseDto>();

  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  const handleLocationChange = (
    newLocation: google.maps.LatLngLiteral | null
  ) => {
    setSelectedLocation(newLocation);
    form.setFieldsValue({ location: newLocation });
  };

  const getLocation = async (
    latitude: number,
    longitude: number
  ): Promise<string> => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );

      if (response.status === 200) {
        const results = response.data.results;
        if (results.length > 0) {
          const formattedAddress = results[0].formatted_address;
          return formattedAddress;
        }
      }
    } catch (error) {
      console.error("Error getting location data:", error);
    }
    return "";
  };

  const facilitiesList = (carPark: boolean, shower: boolean) => {
    if (carPark && shower) {
      return ["carpark", "shower"];
    } else if (carPark) {
      return ["carpark"];
    } else if (shower) {
      return ["shower"];
    } else {
      return [];
    }
  };

  const onFinish = async (values: UpdateSportAreaForm) => {
    const location = await getLocation(
      values.location.lat,
      values.location.lng
    );
    const data = {
      name: values.name,
      description: values.description,
      price: values.price,
      carPark: values.facilities?.includes("carpark") ? true : false,
      shower: values.facilities?.includes("shower") ? true : false,
      latitude: values.location.lat,
      longitude: values.location.lng,
      location: location,
      sportType: values.sporttype,
    };
    await apiClient
      .updateSportArea(mockProfile.sportAreaId, data)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchSportArea = async () => {
      await apiClient
        .getSportAreaByID(mockProfile.sportAreaId)
        .then((res) => {
          setSportAreaInfo(res.data.data);
          setSelectedLocation({
            lat: res.data.data.latitude,
            lng: res.data.data.longitude,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchSportArea();
  }, []);

  return sportAreaInfo ? (
    <div className="update-sportarea-container">
      <div className="update-sportarea-header">Update Sport Area Form</div>
      <Form
        form={form}
        style={{ marginTop: "30px" }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          initialValue={sportAreaInfo?.name}
          label="Name"
          name="name"
          style={{ marginBottom: "16px" }}
          rules={[
            {
              required: true,
              message: "Please input your name",
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          initialValue={sportAreaInfo?.description}
          label="Description"
          name="description"
          style={{ marginBottom: "16px" }}
          rules={[
            {
              required: true,
              message: "Please input your description",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>
        <Form.Item
          initialValue={sportAreaInfo?.sportType}
          label="Sport Type"
          name="sporttype"
          style={{ marginBottom: "16px" }}
          rules={[{ required: true, message: "Please select a sport type" }]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={() => {}}
            options={sportTypeOptions}
          />
        </Form.Item>
        <Form.Item
          initialValue={parseInt(sportAreaInfo?.price ?? "")}
          label="Estimated Price (Baht)"
          name="price"
          style={{ marginBottom: "16px" }}
          rules={[
            {
              required: true,
              message: "Please input your price",
            },
          ]}
        >
          <InputNumber
            min={0}
            max={9999}
            style={{ width: "100%" }}
            placeholder="Price"
          />
        </Form.Item>
        <Form.Item
          initialValue={facilitiesList(
            sportAreaInfo?.carPark,
            sportAreaInfo?.shower
          )}
          label="Facilities"
          name="facilities"
          style={{ marginBottom: "16px" }}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={() => {}}
            options={options}
          />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          style={{ marginBottom: "16px" }}
          initialValue={selectedLocation ? selectedLocation : ""}
          rules={[{ required: true, message: "Please select a location!" }]}
        >
          <MapComponent
            centerPoint={{
              lat: sportAreaInfo?.latitude ?? 0,
              lng: sportAreaInfo?.longitude ?? 0,
            }}
            selectedLocation={selectedLocation}
            handleLocationChange={handleLocationChange}
          />
        </Form.Item>
        <Form.Item
          name="update-sportarea-button"
          className="update-sportarea-item-button"
          style={{ marginBottom: "11px" }}
        >
          <Button className="update-sportarea-button" htmlType="submit">
            Confirm
          </Button>
          <Button
            className="cancel-update-button"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default UpdateSportAreaPage;
