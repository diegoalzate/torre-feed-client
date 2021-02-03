import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// Icons
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

import CalendarToday from "@material-ui/icons/CalendarToday";
import MyButton from "../util/MyButton";

import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
const styles = {
  paper: {
    padding: "5%",
    backgroundColor: "#F8F8FF",
    borderRadius: "20px",
  },
  imageWrapper: {
    textAlign: "center",
    position: "relative",
  },
  profileImage: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
  profileDetails: {
    textAlign: "center",
    "& span, svg": {
      verticalAlign: "middle",
    },
    "& a": {
      color: "#00bcd4",
    },
  },
  hr: {
    border: "none",
    margin: "0 0 10px 0",
  },
};

const StaticProfile = (props) => {
  const {
    classes,
    user: {
      credentials: { handle, createdAt, photoUrl },
    },
  } = props;
  const handlelogoutUser = () => {
    props.logoutUser();
    window.location.reload();
  };
  return (
    <Paper className={classes.paper}>
      <div>
        <div className={classes.imageWrapper}>
          <img src={photoUrl} alt="profile" className={classes.profileImage} />
        </div>
        <hr />
        <div className={classes.profileDetails}>
          <MuiLink component={Link} to={``} color="primary" variant="h5">
            @{handle}
          </MuiLink>
          <hr />
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          <hr />
          <MyButton tip="Logout" onClick={handlelogoutUser}>
            <KeyboardReturn color="primary" />
          </MyButton>
        </div>
      </div>
    </Paper>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  logoutUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(StaticProfile));
