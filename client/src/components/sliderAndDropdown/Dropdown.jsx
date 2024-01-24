import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const Dropdown = ({ items, onChange, value, label, name }) => {
  console.log("DD:",items);
  return (
    <Box sx={{ width: 250 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          name={name}
          onChange={onChange}
          sx={{
            "& .MuiInputBase-input": {
              // backgroundColor: "yourColorHere",
              borderColor: "#4C2B21",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4C2B21", // Change this to the desired border color
            },
          }}
        >
        
  
          {items?.map((item, index) => (
            <MenuItem key={index} value={item.name?item.name:item}>{item.name?item.name:item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default Dropdown;

// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { useState, useMemo } from "react";
// import { useSelector } from "react-redux";

// // ... (your other imports)

// const Dropdown = ({ onChange, value, label, name }) => {
//   const productData = useSelector((state) => state.product.data);
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredProducts = useMemo(() => {
//     return productData?.filter((product) =>
//       product.genre.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [productData, searchQuery]);

//   const handleSearchMouseDown = (e) => {
//     // Prevent the default behavior to stop the event propagation
//     e.preventDefault();
//   };

//   return (
//     <Box sx={{ width: 250 }}>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">{label}</InputLabel>

//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={value}
//           label={label}
//           name={name}
//           onChange={onChange}
//           sx={{
//             "& .MuiInputBase-input": {
//               borderColor: "#4C2B21",
//             },
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#4C2B21",
//             },
//           }}
//         >
//           {/* Search Bar */}
//           <input
//             type="text"
//             placeholder="Search "
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onMouseDown={handleSearchMouseDown}
//             className="w-72 p-2 border border-gray-300 rounded"
//           />
//           {/* Use filteredProducts for rendering the MenuItem */}
//           {filteredProducts?.map((product, index) => (
//             <MenuItem key={index} value={product.name}>
//               {product.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

// export default Dropdown;


