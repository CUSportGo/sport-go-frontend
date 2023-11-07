import React, { useState } from "react";
import { Divider } from "antd";
import "./SportAreaInfo.css";
import { BsCheck, BsX } from "react-icons/bs";
import { Image } from "antd";
import BookingContainer from "../BookingContainer/BookingContainer";

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
  const [showMoreImages, setShowMoreImages] = useState(false);

  const checkFacilities = (isAvailable: boolean) => {
    if (isAvailable) {
      return <BsCheck style={{ height: "20px", width: "20px" }} />;
    } else {
      return <BsX style={{ height: "20px", width: "20px" }} />;
    }
  };
  const displayedImages = showMoreImages
    ? image
    : image && image.length > 4
    ? image.slice(0, 4)
    : image;

  const handleImageClick = () => {
    setShowMoreImages(!showMoreImages);
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
      <div className="sportarea-image-container">
        {displayedImages &&
          displayedImages.map((item, index) => {
            return (
              <div key={index} style={{ position: "relative" }}>
                {index === 3 && image.length > 4 && !showMoreImages && (
                  <div
                    className="viewmore-overlay"
                    onClick={index === 3 && !showMoreImages ? () => handleImageClick() : () => {}}
                  >
                    View More
                  </div>
                )}
                <Image
                  style={
                    index === 3 && !showMoreImages && image.length > 4
                      ? {
                          objectFit: "cover",
                          cursor: "pointer",
                          position: "relative",
                          aspectRatio: "1/1",
                          filter: "blur(3px)",
                        }
                      : {
                          objectFit: "cover",
                          cursor: "pointer",
                          position: "relative",
                          aspectRatio: "1/1",
                        }
                  }
                  src={item}
                  key={index}
                  preview={index === 3 && !showMoreImages && image.length > 4 ? false : true}
                  onClick={
                    index === 3 && !showMoreImages && image.length > 4
                      ? () => handleImageClick()
                      : () => {}
                  }
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SportAreaInfo;
