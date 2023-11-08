import { Button } from "antd";
import "./SportAreaHomePage.css";
import { useNavigate } from "react-router-dom";
import SportAreaInfo from "../../components/SportAreaInfo/SportAreaInfo";
import { SportAreaResponseDto } from "../../types/sportarea.dto";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/clients";
import AreaContainer from "../../components/AddAreaForm/AddAreaForm";

const SportAreaHomePage = () => {
  const id = "654a5d108616e9e53d6a6be4";
  const isSportAreaCreated = true;
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
  };

  const [sportAreaInfo, setSportAreaInfo] = useState<SportAreaResponseDto>(mock);

  useEffect(() => {
    const fetchSportArea = async () => {
      await apiClient
        .getSportAreaByID(id)
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

  return isSportAreaCreated ? (
    <div className="sport-home-container">
      <SportAreaInfo
        name={sportAreaInfo.name}
        locaiton={sportAreaInfo.location}
        description={
          sportAreaInfo.description
        }
        carpark={sportAreaInfo.carPark}
        shower={sportAreaInfo.shower}
        image={sportAreaInfo.image}
      />
      <AreaContainer sportAreaId={id} sportList={sportAreaInfo.sportList} />
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
