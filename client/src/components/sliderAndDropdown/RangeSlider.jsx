// import React from "react";
// import Box from "@mui/material/Box";
// import Slider from "@mui/material/Slider";

// const valuetext = (value) => {
//   return `$ ${value}`;
// };

// const RangeSlider = ({ min, max, onChange }) => {
//   const [value, setValue] = React.useState([min, max]);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//     onChange(newValue);
//   };

//   return (
//     <Box sx={{ width: 250 }}>
//       <Slider
//         getAriaLabel={() => "Price range"}
//         value={value}
//         onChange={handleChange}
//         valueLabelDisplay="auto"
//         getAriaValueText={valuetext}
//         min={min}
//         max={max}
//         style={{ color: "#4C2B21" }}
//         size="small"
//       />
//     </Box>
//   );
// };

import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const RangeSlider = () => {
  return (
    <div>
      <details className="overflow-hidden rounded border border-[#4C2B21] [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-[#FDFBF7] p-4 text-gray-900 transition">
          <span className="text-sm font-medium"> Price </span>

          <span className="transition group-open:-rotate-180">
            <IoIosArrowDown />
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <span className="text-sm text-gray-700">
          
              The highest price is $600
            </span>

            <button
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4"
            >
              Reset
            </button>
          </header>

          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between gap-4">
              <label
                htmlFor="FilterPriceFrom"
                className="flex items-center gap-2"
              >
                <span className="text-sm text-gray-600">$</span>

                <input
                  type="number"
                  id="FilterPriceFrom"
                  placeholder="From"
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </label>

              <label
                htmlFor="FilterPriceTo"
                className="flex items-center gap-2"
              >
                <span className="text-sm text-gray-600">$</span>

                <input
                  type="number"
                  id="FilterPriceTo"
                  placeholder="To"
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </label>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

export default RangeSlider;
