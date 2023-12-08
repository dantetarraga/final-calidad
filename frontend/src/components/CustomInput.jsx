import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/system";
import PropTypes from "prop-types";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    width: "100%",
  },
}));

const CustomInput = ({ placeholder, onChange }) => {
  const handleChange = (event) => {
    onChange(event);
  };
  return (
    <StyledInputBase
      sx={{ width: "100%" }}
      placeholder={placeholder}
      onChange={handleChange}
      inputProps={{
        "aria-label": placeholder,
        name: "contenido",
      }}
    />
  );
};

CustomInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomInput;
