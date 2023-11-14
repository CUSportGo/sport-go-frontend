import React, { useState } from "react";
import "./SportAreaItem.css";
import classnames from "classnames";

interface SportItemProps {
  SportAreaName: string;
  SportAreaImage?: string;
  SportAreaTag: string[];
  distance: number;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const SportAreaItem: React.FC<SportItemProps> = ({
  SportAreaName,
  SportAreaImage,
  SportAreaTag,
  distance,
  onClick,
}) => {
  const [isClicked, setClick] = useState(false);
  return (
    <div
      onClick={(e) => {
        onClick(e);
        setClick(!isClicked);
      }}
      className={classnames("sportAreaItem-container", { clicked: isClicked })}
    >
      <img src={SportAreaImage} className="sportAreaItem-img"></img>
      <div className="distance-text">{distance.toFixed(2)} km</div>
      <div className="sportAreaItem-text">
        <h1 className="sportAreaItem-name"> {SportAreaName}</h1>
        <div className="sportAreaItem-tags">
          {SportAreaTag.map((tag, index) => (
            <span key={index} className="eachSportType-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportAreaItem;
