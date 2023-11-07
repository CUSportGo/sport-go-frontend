import { Button } from "antd";
import "./SportAreaHomePage.css";
import { useNavigate } from "react-router-dom";
import SportAreaInfo from "../../components/SportAreaInfo/SportAreaInfo";

const SportAreaHomePage = () => {
  const isSportAreaCreated = true;
  const navigate = useNavigate();
  return isSportAreaCreated ? (
    <div className="sport-home-container">
      <SportAreaInfo
        name={"Test01"}
        locaiton={"locationlocationlocationlocation"}
        description={"descriptiondescriptiondescriptiondescription\ndescriptiondescriptiondescriptiondescription"}
        carpark={true}
        shower={false}
        image={[
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1200px-RedCat_8727.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1200px-RedCat_8727.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1200px-RedCat_8727.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1200px-RedCat_8727.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1200px-RedCat_8727.jpg",
        ]}
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
