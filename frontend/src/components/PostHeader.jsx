import { Avatar, Typography } from "@mui/material";
import PropTypes from "prop-types";

const PostHeader = ({ userProfileImage, nombre, apellidos, postDate }) => {
  const userName = String(nombre).concat(" ", apellidos);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar src={userProfileImage} alt="User Profile" />
      <div style={{ marginLeft: "8px" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {userName}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {postDate}
        </Typography>
      </div>
    </div>
  );
};

PostHeader.propTypes = {
  userProfileImage: PropTypes.string,
  nombre: PropTypes.string,
  apellidos: PropTypes.string,
  postDate: PropTypes.string,
};

export default PostHeader;
