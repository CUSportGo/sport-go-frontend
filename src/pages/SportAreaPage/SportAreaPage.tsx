import { useParams } from "react-router-dom";
import "./SportAreaPage.css";
import SportAreaInfo from "../../components/SportAreaInfo/SportAreaInfo";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/clients";
import { SportAreaResponseDto } from "../../types/sportarea.dto";

const SportAreaPage = () => {
  const { id } = useParams();

  const mock: SportAreaResponseDto = {
    id: "",
    name: "",
    shower: false,
    carPark: false,
    sportType: [],
    location: "",
    description: "",
    price: "",
  };

  const [sportAreaInfo, setSportAreaInfo] =
    useState<SportAreaResponseDto>(mock);

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

  return (
    <div className="sportareaPage-container">
      <SportAreaInfo
        name={sportAreaInfo.name}
        locaiton={sportAreaInfo.location}
        description={sportAreaInfo.description}
        carpark={sportAreaInfo.carPark}
        shower={sportAreaInfo.shower}
        image={sportAreaInfo.image ? sportAreaInfo.image : []}
      />
    </div>
  );
};

export default SportAreaPage;
