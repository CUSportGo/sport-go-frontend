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

interface UpdateSportAreaForm {
  name: string;
  description: string;
  sporttype: string[];
  price: number;
  facilities: string[];
  location: google.maps.LatLngLiteral;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

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

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isImageError, setIsImageError] = useState(false);

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

  const handleUploadChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinish = async (values: UpdateSportAreaForm) => {
    console.log(values);
    const location = await getLocation(
      values.location.lat,
      values.location.lng
    );

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    formData.append(
      "carPark",
      values.facilities?.includes("carpark") ? "true" : "false"
    );
    formData.append(
      "shower",
      values.facilities?.includes("shower") ? "true" : "false"
    );
    formData.append("latitude", values.location.lat.toString());
    formData.append("longitude", values.location.lng.toString());
    formData.append("location", location);
    values.sporttype.forEach((sporttype: string) => {
      formData.append("sportType", sporttype);
    });
    if (fileList.length > 0) {
      fileList.forEach((file: UploadFile) => {
        const blobObj = new Blob([file as RcFile], { type: file.type });
        const fileObj = new File([blobObj], file.name, { type: file.type });
        formData.append("files", fileObj);
      });
    }
    // await apiClient
    //   .createSportArea(formData)
    //   .then((res) => {
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    const fetchSportArea = async () => {
      await apiClient
        .getSportAreaByID("654a5d108616e9e53d6a6be4")
        .then((res) => {
          console.log(res);
          setSportAreaInfo(res.data.data);
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
          initialValue={
            sportAreaInfo?.carPark || sportAreaInfo?.shower
              ? [
                  sportAreaInfo?.carPark ? "carpark" : "",
                  sportAreaInfo?.shower ? "shower" : "",
                ]
              : []
          }
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
              beforeUpload={() => {
                return false;
              }}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleUploadChange}
            >
              {/* max 20 images */}
              {fileList.length >= 20 ? null : uploadButton}
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
          name="update-sportarea-button"
          className="update-sportarea-item-button"
          style={{ marginBottom: "11px" }}
        >
          <Button className="update-sportarea-button" htmlType="submit">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default UpdateSportAreaPage;
