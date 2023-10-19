import { MouseEvent, useState } from "react";
import Searchbar from "../../components/Searchbar/Searchbar";
import SportAreaItem from "../../components/SportAreaItem/SportAreaItem";
import "./HomePage.css";
import { Checkbox, Divider, Input, InputNumber } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";

const HomePage = () => {
  const sportTypeOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
  ];

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();

  const onChangeCheckList = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    console.log(list);
  };

  return (
    <div className="homepage-container">
      <div className="left-column">
        <Searchbar onSearch={() => {}} />
        <div className="select-sporttype-text">Sport Type</div>
        <Checkbox.Group
          className="sporttype-checkbox"
          options={sportTypeOptions}
          onChange={onChangeCheckList}
        />
        <Divider style={{ backgroundColor: "lightgray" }} />
        <div className="select-distance-text">Distance</div>
        <div className="select-distance-section">
          <InputNumber className="distance-input" defaultValue={0} min={0} max={99}/>
          <div className="text-distance">to</div>
          <InputNumber className="distance-input" defaultValue={99} min={0} max={99}/>
          <div className="text-distance">km</div>
        </div>
      </div>
      <div className="right-column">
        <div>Total results</div>
        <div className="result-section">
          <SportAreaItem
            SportAreaName={"Area 01"}
            SportAreaTag={[
              "Badminton",
              "Badminton",
              "Badminton",
              "Badminton",
              "Badminton",
            ]}
            distance={10}
            onClick={() => {}}
          />
          <SportAreaItem
            SportAreaName={""}
            SportAreaTag={[]}
            distance={0}
            onClick={() => {}}
          />
          <SportAreaItem
            SportAreaName={""}
            SportAreaTag={[]}
            distance={0}
            onClick={() => {}}
          />
          <SportAreaItem
            SportAreaName={""}
            SportAreaTag={[]}
            distance={0}
            onClick={() => {}}
          />
          <SportAreaItem
            SportAreaName={""}
            SportAreaTag={[]}
            distance={0}
            onClick={() => {}}
          />
          <SportAreaItem
            SportAreaName={""}
            SportAreaTag={[]}
            distance={0}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
