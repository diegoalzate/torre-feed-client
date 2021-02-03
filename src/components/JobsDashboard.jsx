import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getJobs } from "../redux/actions/dataActions";
import { makeStyles } from "@material-ui/core/styles";
import JobPreview from "./JobPreview";
import Profile from "./Profile";
// MUI stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

// Icons
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "30px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  title: {
    color: "#CDDC39",
  },
  empty: {
    padding: "10%",
    backgroundColor: "#27292D",
    borderRadius: "20px",
  },
  button: {
    margin: "20px",
  },
});

function JobsDashboard(props) {
  const classes = useStyles();
  const [jobsState, setJobs] = useState([]);
  const {
    user: {
      credentials: { handle, location },
      authenticated,
    },
    data: { jobs, loading },
  } = props;
  useEffect(() => {
    if (props.user.authenticated) {
      setJobs(props.getJobs());
    }
  }, [authenticated]);
  let allJobs = jobs.map((j) => {
    return <JobPreview title={j.title} url={j.url} type={j.type} />;
  });
  let jobMarkup = !loading ? (
    authenticated ? (
      <div>
        <h1 className={classes.title}>Profile</h1>

        <Profile />
        <h1 className={classes.title}>Best Jobs for you</h1>
        {allJobs}
      </div>
    ) : (
      <Paper class={classes.empty} r>
        <Typography variant="body2" color="secondary" align="center">
          No profile found, please login again
        </Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            className={classes.button}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
            className={classes.button}
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <CircularProgress size={30} />
  );
  return <div>{jobMarkup}</div>;
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});
const mapActionsToProps = {
  getJobs,
};

export default connect(mapStateToProps, mapActionsToProps)(JobsDashboard);
