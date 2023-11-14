import { Button } from "antd";
import "./UnauthorizedPage.css";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <h1>Unauthorized</h1>
      <Button
        className="go-back-button"
        onClick={() => {
          navigate("/");
        }}
      >
        Go back
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
