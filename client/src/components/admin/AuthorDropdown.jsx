import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AuthorDropdown = ({ items, onChange, value, label, name }) => {
  console.log("DD:", items);
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
            <MenuItem key={index} value={item._id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default AuthorDropdown;
