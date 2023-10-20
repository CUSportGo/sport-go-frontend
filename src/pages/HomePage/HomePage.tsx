import { MouseEvent, useState } from "react";
import Searchbar from "../../components/Searchbar/Searchbar";
import SportAreaItem from "../../components/SportAreaItem/SportAreaItem";
import "./HomePage.css";
import { Checkbox, Divider, Input, InputNumber } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const sportTypeOptions = [
    { label: "Badminton", value: "badminton" },
    { label: "Football", value: "football" },
    { label: "Tennis", value: "tennis" },
    { label: "Basketball", value: "basketball" },
  ];

  const data = [
    {
      distance: 10,
      name: "Area 01",
      tags: ["Badminton", "Tennis"],
    },
    {
      distance: 5,
      name: "Area 02",
      tags: ["Badminton", "Football"],
    },
    {
      distance: 1,
      name: "Area 03",
      tags: ["Badminton", "Basketball"],
    },
    {
      distance: 20,
      name: "Area 04",
      tags: ["Badminton", "Tennis"],
    },
    {
      distance: 15,
      name: "Area 05",
      tags: ["Badminton", "Football"],
    },
    {
      distance: 3,
      name: "Area 06",
      tags: ["Badminton", "Basketball"],
    },
    {
      distance: 7,
      name: "Area 07",
      tags: ["Badminton", "Tennis"],
    },
  ];

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [minDistance, setMinDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(99);
  const navigate = useNavigate();

  const onChangeCheckList = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    console.log(list);
  };

  const onSearch = (value: string) => {
    console.log(value);
    console.log(checkedList);
    console.log(minDistance);
    console.log(maxDistance);
  };

  return (
    <div className="homepage-container">
      <div className="left-column">
        <Searchbar onSearch={onSearch} />
        <div className="select-sporttype-text">Sport Type</div>
        <Checkbox.Group
          className="sporttype-checkbox"
          options={sportTypeOptions}
          onChange={onChangeCheckList}
        />
        <Divider style={{ backgroundColor: "lightgray" }} />
        <div className="select-distance-text">Distance</div>
        <div className="select-distance-section">
          <InputNumber
            className="distance-input"
            defaultValue={0}
            min={0}
            max={99}
            value={minDistance}
            onChange={(value: number | null) =>
              value !== null && setMinDistance(value)
            }
          />
          <div className="text-distance">to</div>
          <InputNumber
            className="distance-input"
            defaultValue={99}
            min={0}
            max={99}
            value={maxDistance}
            onChange={(value: number | null) =>
              value !== null && setMaxDistance(value)
            }
          />
          <div className="text-distance">km</div>
        </div>
      </div>
      <div className="right-column">
        <div className="result-text">Total results : {data.length}</div>
        <div className="result-section">
          {data.map((item, index) => (
            <SportAreaItem
              key={index}
              SportAreaName={item.name}
              SportAreaTag={item.tags}
              distance={item.distance}
              onClick={() => {navigate(`/sportarea/${index}`)}}  //change to id
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
