import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  SelectProps,
} from "antd";
import "./CreateSportAreaPage.css";
import { Store } from "antd/es/form/interface";
import Upload, { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import MapComponent from "../../components/Map/MapComponent";
import { SportTypeEnum } from "../../utils/enums/sportType.enums";
import axios from "axios";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CreateSportAreaPage = () => {
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

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isImageError, setIsImageError] = useState(false);

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

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setIsImageError(newFileList.some((file) => file.status === "error"));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinish = async (values: Store) => {
    const location = await getLocation(
      values.location.lat,
      values.location.lng
    );
    const data = {
      name: values.name,
      description: values.description,
      sportType: values.sporttype,
      price: values.price,
      carPark: values.facilities?.includes("carpark") ? true : false,
      shower: values.facilities?.includes("shower") ? true : false,
      latitude: values.location.lat,
      longitude: values.location.lng,
      location: location,
      image: fileList.map((file) => file.uid),
    };
    console.log(data);
  };

  return (
    <div className="create-sportarea-container">
      <div className="create-sportarea-header">Create Sport Area Form</div>
      <Form
        form={form}
        style={{ marginTop: "30px" }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
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
            selectedLocation={selectedLocation}
            handleLocationChange={handleLocationChange}
          />
        </Form.Item>

        <Form.Item
          label="Add Image"
          name="addImage"
          style={{ marginBottom: "16px" }}
          rules={[
            {
              validator: () => {
                if (fileList.some((file: any) => file.status === "error")) {
                  return Promise.reject();
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        >
          <div>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 || isImageError ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{ width: "100%", objectFit: "cover" }}
                src={previewImage}
              />
            </Modal>
            {isImageError && (
              <div style={{ color: "red" }}>
                Please check the images for errors.
              </div>
            )}
          </div>
        </Form.Item>

        <Form.Item
          name="create-sportarea-button"
          className="create-sportarea-item-button"
          style={{ marginBottom: "11px" }}
        >
          <Button className="create-sportarea-button" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateSportAreaPage;
