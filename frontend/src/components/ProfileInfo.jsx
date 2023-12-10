import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const ProfileInfo = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <>
      {data.map((ProfileInfo, index) => (
        <Box key={index} sx={{ backgroundColor: "ProfileInfo.main" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontSize: 29 }} color="text.pramary">
              {ProfileInfo.contenido}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
};

ProfileInfo.propTypes = {
  data: PropTypes.object,
};

export default ProfileInfo;
