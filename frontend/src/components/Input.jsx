import { alpha, styled } from "@mui/material";
import InputBase from "@mui/material/InputBase";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    width: "100%",
  },
}));

const Input = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexGrow: 1,
  marginLeft: theme.spacing(1),
  backgroundColor: "#434557",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
}));

export { Input, StyledInputBase };
