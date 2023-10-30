import { useEffect, useState } from "react";
import Searchbar from "../../components/Searchbar/Searchbar";
import SportAreaItem from "../../components/SportAreaItem/SportAreaItem";
import "./HomePage.css";
import { Checkbox, Divider, Select } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../utils/clients";
import {
  SearchSportAreaRequestDto,
  SportArea,
} from "../../types/sportarea.dto";
import { SportTypeEnum } from "../../utils/enums/sportType.enums";

const HomePage = () => {
  const sportTypeOptions = Object.values(SportTypeEnum).map((item) => {
    return { label: item, value: item };
  });

  const distanceOptions = [
    { value: 2, label: "Below 2 km" },
    { value: 5, label: "Below 5 km" },
    { value: 10, label: "Below 10 km" },
    { value: -1, label: "Any" },
  ];

  const [searchResult, setSearchResult] = useState<SportArea[]>([]);
  const [sportTypeList, setSportTypeList] = useState<CheckboxValueType[]>([""]);
  const [distance, setDistance] = useState(-1);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const navigate = useNavigate();

  const onChangeCheckList = (list: CheckboxValueType[]) => {
    setSportTypeList(list);
  };

  const onChangeDistance = (value: number) => {
    console.log(value);
    setDistance(value);
  };

  const onSearch = async (value: string) => {    
    const data: SearchSportAreaRequestDto = {
      keyword: value,
      latitude: 1.1,
      longitude: 1.1,
    };
    if (sportTypeList.length > 0) {
      data.type = sportTypeList.map((type) => String(type));
    }
    if (distance > -1) {
      data.maxDistance = distance;
    }    
    console.log(data);
    
    await apiClient
      .searchSportArea(data)
      .then((res) => {
        if (res.data.data) {
          setSearchResult([]);
        }
        setSearchResult(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        function (error) {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser");
    }
    const fetchSportArea = async () => {
      const data: SearchSportAreaRequestDto = {
        latitude: 1.1,
        longitude: 1.1,
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
          <Select
            defaultValue={-1}
            style={{ width: "100%" }}
            onChange={onChangeDistance}
            options={distanceOptions}
          />
        </div>
      </div>
      <div className="right-column">
        <div className="result-text">
          Total results : {searchResult ? searchResult.length : 0}
        </div>
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
