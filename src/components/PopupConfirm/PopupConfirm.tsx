import { useState } from "react";
import Button from "../Buttons/Button";
import "./PopupConfirm.css";

interface Props {
  description?: string;
  confirmMessage: string;
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PopupConfirm: React.FC<Props> = ({
  description,
  confirmMessage,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="popup-confirm">
      <div className="text-areyousure"> Are you sure?</div>
      <div className="description-box-confirm">
        <div className="description-comfirm-text">{description}</div>
      </div>
      <div className="button-panel">
        <Button
          onClick={(e) => {
            onCancel(e);
          }}
          message="Cancel"
          type="button"
          bwidth="202px"
          bheight="45px"
          bgColor="#A8A8A8"
          fontSize="20px"
        ></Button>
        <Button
          onClick={(e) => {
            onConfirm(e);
          }}
          message={confirmMessage}
          type="button"
          bwidth="202px"
          bheight="45px"
          bgColor="#DD534B"
          fontSize="20px"
        ></Button>
      </div>
    </div>
  );
};

export default PopupConfirm;
