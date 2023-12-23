// import * as React from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

// const Dropdown = ({ items, onChange, value, label }) => {
//   return (
//     <Box sx={{ width: 250 }}>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">{label}</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={value}
//           label={label}
//           onChange={onChange}
//           sx={{
//             "& .MuiInputBase-input": {
//               // backgroundColor: "yourColorHere",
//               borderColor: "#4C2B21",
//             },
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#4C2B21", // Change this to the desired border color
//             },
//           }}
//         >
//           {items.map((item, index) => (
//             <MenuItem value={item}>{item}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };
// export default Dropdown;
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <details className="overflow-hidden rounded border border-[#4C2B21] [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-[#FDFBF7] p-4 text-gray-900 transition">
          <span className="text-sm font-medium"> Genre</span>

          <span className="transition group-open:-rotate-180">
            <IoIosArrowDown />
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white">
          <a
            href="#"
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            Romance
          </a>
          <a
            href="#"
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            Horror
          </a>
          <a
            href="#"
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            SciFi
          </a>
        </div>
      </details>
    </div>
  );
};

export default Dropdown;
