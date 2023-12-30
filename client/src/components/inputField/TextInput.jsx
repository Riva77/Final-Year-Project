import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const TextInput = ({ type, value, onChange, name, label, min }) => {
  const [inputType, setInputType] = useState(type);

  const handlePasswordVisibility = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <div style={{ position: "relative", width: 260 }}>
      <label
        htmlFor={name}
        style={{
          minWidth: "260px",
          display: "block",
          overflow: "hidden",
          borderRadius: "8px",
          border: "2px solid  #e5e7eb",
          padding: "6px 8px",
          width: "100%",
          boxShadow: "0 2px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "black",
          }}
        >
          {label}
        </span>

        <input
          type={inputType}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          min={min}
          style={{
            marginTop: "4px",
            width: "100%",
            border: "none",
            background: "transparent",
            color: "#000000",
            padding: "0",
            outline: "none",
          }}
        />

        {type === "password" && (
          <span
            style={{
              position: "absolute",
              top: "60%",
              right: "3px",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            onClick={handlePasswordVisibility}
          >
            {inputType === "password" ? (
              <AiOutlineEyeInvisible
                size={20}
                style={{
                  color: "black",
                }}
              />
            ) : (
              <AiOutlineEye
                size={20}
                style={{
                  color: "black",
                }}
              />
            )}
          </span>
        )}
      </label>
    </div>
  );
};

export default TextInput;
