import { Button } from "antd";
import "./SportAreaHomePage.css";
import { useNavigate } from "react-router-dom";
import SportAreaInfo from "../../components/SportAreaInfo/SportAreaInfo";
import { SportAreaResponseDto } from "../../types/sportarea.dto";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/clients";
import AreaContainer from "../../components/AreaContainer/AreaContainer";
import { useAuth } from "../../context/AuthProvider";

const SportAreaHomePage = () => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const mock: SportAreaResponseDto = {
    id: "",
    name: "",
    shower: false,
    carPark: false,
    sportType: [],
    location: "",
    description: "",
    price: "",
    image: [],
    sportList: [],
    latitude: 0,
    longitude: 0,
  };

  const [sportAreaInfo, setSportAreaInfo] =
    useState<SportAreaResponseDto>(mock);

  useEffect(() => {
    const fetchSportArea = async () => {
      await apiClient
        .getSportAreaByID(user?.sportAreaId)
        .then((res) => {
          console.log(res);
          setSportAreaInfo(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (user?.sportAreaId) {
      fetchSportArea();
    }
  }, []);

  return user?.sportAreaId ? (
    <div className="sport-home-container">
      <div className="update-sport-button-div">
        <Button
          className="update-sport-button"
          onClick={() => {
            navigate("/update-sportarea");
          }}
        >
          Edit
        </Button>
      </div>

      <SportAreaInfo
        name={sportAreaInfo.name}
        locaiton={sportAreaInfo.location}
        description={sportAreaInfo.description}
        carpark={sportAreaInfo.carPark}
        shower={sportAreaInfo.shower}
        image={sportAreaInfo.image}
      />
      <AreaContainer
        sportAreaId={user.sportAreaId}
        sportList={sportAreaInfo.sportList}
      />
    </div>
  ) : (
    <div className="no-sport-home-container">
      <div className="no-sport-text">You haven't created sport area yet</div>
      <Button
        className="create-sport-button"
        onClick={() => {
          navigate("/create-sportarea");
        }}
      >
        Create Sport Area
      </Button>
    </div>
  );
};

export default SportAreaHomePage;
