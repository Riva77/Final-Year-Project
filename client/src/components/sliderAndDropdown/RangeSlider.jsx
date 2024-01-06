import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const valuetext = (value) => {
  return `$ ${value}`;
};

const RangeSlider = ({ min, max, onChange }) => {
  const [value, setValue] = React.useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Box sx={{ width: 250 }}>
      <Slider
        getAriaLabel={() => "Price range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={min}
        max={max}
        style={{ color: "#4C2B21" }}
        size="small"
      />
    </Box>
  );
};

export default RangeSlider;
