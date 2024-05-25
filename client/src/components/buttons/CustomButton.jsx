import React from "react";

const CustomButton = ({ isDisabled, name, color, type, onClick }) => {
  return (
    <button
      style={{
        isDisabled: isDisabled,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "45px",
        width: "150px",
        padding: "11px",
        border: color == null ? "2px solid #4C2B21" : "2px solid white",
        borderRadius: "5px",
        fontSize: "17px",
        background: "#4C2B21",
        color: color == null ? "white" : color,
        cursor: "pointer",
      }}
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default CustomButton;
