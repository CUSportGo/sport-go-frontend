import { useEffect, useState } from "react";
import Searchbar from "../../components/Searchbar/Searchbar";
import SportAreaItem from "../../components/SportAreaItem/SportAreaItem";
import "./HomePage.css";
import { Checkbox, Divider, Input, InputNumber } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../utils/clients";
import {
  SearchSportAreaRequestDto,
  SportArea,
} from "../../types/sportarea.dto";

const HomePage = () => {
  const sportTypeOptions = [
    { label: "Badminton", value: "badminton" },
    { label: "Football", value: "football" },
    { label: "Tennis", value: "tennis" },
    { label: "Basketball", value: "basketball" },
  ];

  const [searchResult, setSearchResult] = useState<SportArea[]>([]);
  const [sportTypeList, setSportTypeList] = useState<CheckboxValueType[]>([""]);
  const [minDistance, setMinDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(99);
  const navigate = useNavigate();

  const onChangeCheckList = (list: CheckboxValueType[]) => {
    setSportTypeList(list);
  };

  const onSearch = async (value: string) => {
    const data: SearchSportAreaRequestDto = {
      type: sportTypeList.map((type) => String(type)),
      location: "Hello",
      latitude: 1.1,
      longitude: 1.1,
      maxDistance: maxDistance,
      date: "Hello",
      startTime: "Hello",
      endTime: "Hello",
    };
    await apiClient
      .searchSportArea(data)
      .then((res) => {
        console.log(res.data.data);
        if(res.data.data){
          setSearchResult([]);
        }
        setSearchResult(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchSportArea = async () => {
      const data: SearchSportAreaRequestDto = {
        type: [""],
        location: "Hello",
        latitude: 1.1,
        longitude: 1.1,
        maxDistance: 10,
        date: "Hello",
        startTime: "Hello",
        endTime: "Hello",
      };
      await apiClient
        .searchSportArea(data)
        .then((res) => {
          console.log(res.data.data);
          setSearchResult(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchSportArea();
  }, []);

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
        <div className="result-text">Total results : {searchResult?searchResult.length:0}</div>
        <div className="result-section">
          {searchResult && searchResult.length > 0 ? (
            searchResult.map((item, index) => (
              <SportAreaItem
                key={index}
                SportAreaName={item.name}
                SportAreaTag={item.sportType}
                distance={item.distance}
                onClick={() => {
                  navigate(`/sportarea/${item.id}`);
                }}
              />
            ))
          ) : (
            <p>No search results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
function useeffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
