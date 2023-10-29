import { Divider } from "antd";
import "./SportAreaInfo.css";
import { BsCheck, BsX } from "react-icons/bs";
import { Image } from "antd";

interface SportAreaInfoProps {
  name: string;
  locaiton: string;
  description: string;
  carpark: boolean;
  shower: boolean;
  image: string[];
}

const SportAreaInfo: React.FC<SportAreaInfoProps> = ({
  name,
  locaiton,
  description,
  carpark,
  shower,
  image,
}) => {
  const checkFacilities = (isAvailable: boolean) => {
    if (isAvailable) {
      return <BsCheck style={{ height: "20px", width: "20px" }} />;
    } else {
      return <BsX style={{ height: "20px", width: "20px" }} />;
    }
  };
  return (
    <div className="sportareainfo-container">
      <div className="sportarea-name">{name}</div>
      <div className="sportarea-location">{locaiton}</div>
      <Divider style={{ backgroundColor: "#A6A6A6", margin: "15px 0" }} />
      <div className="sportarea-description">{description}</div>
      <div className="facilities">
        <div className="facilities-text">Facilities</div>
        <Divider
          type="vertical"
          style={{ backgroundColor: "#A6A6A6", height: "30px", margin: "0" }}
        />
        <div className="facilities-item">{checkFacilities(carpark)}Carpark</div>
        <div className="facilities-item">{checkFacilities(shower)}Shower</div>
      </div>
      <div
        className="sportarea-image-container"
        style={
          image.length == 4
            ? { justifyContent: "space-between" }
            : { gap: "13px" }
        }
      >
        {/* <Image
          width={240}
          height={240}
          style={{ objectFit: "cover" }}
          src="https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg"
        /> */}
        {image.map((item, index) => {
          return (
            <Image
              width={240}
              height={240}
              style={{ objectFit: "cover" }}
              src={item}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SportAreaInfo;
