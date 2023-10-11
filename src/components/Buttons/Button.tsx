import React from "react";
import "./Button.css";

interface ButtonProps {
  message: string;
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  bwidth?: string;
  bheight?: string;
  bgColor?: string;
  fontSize?: string;
  fontWeight?: string;
  id?: string;
  borderRadius?: string;
}

const Button: React.FC<ButtonProps> = ({
  message,
  type,
  onClick,
  bwidth,
  bheight,
  bgColor,
  fontSize,
  fontWeight,
  id,
  borderRadius,
}) => {
  const [hover, setHover] = React.useState(false);

  return (
    <button
      style={{
        width: bwidth,
        height: bheight,
        backgroundColor: bgColor,
        opacity: hover ? 0.9 : 1,
        fontSize: fontSize,
        fontWeight: fontWeight,
        borderRadius: borderRadius,
      }}
      type={type}
      className="button1"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      id={id}
    >
      {message}{" "}
    </button>
  );
};

export default Button;
