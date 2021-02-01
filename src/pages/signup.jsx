import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";
import themeFile from "../util/theme";
//MUI STUFF
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TextField, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import useIsMount from "../util/useIsMount";
//Redux Stuff

import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = themeFile;
function SignUp(props) {
  const isMount = useIsMount();

  const [signup, setSignup] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    errors: {},
  });

  useEffect(() => {
    if (!isMount) {
      if (props.ui.errors !== null) {
        setSignup({ ...signup, errors: props.ui.errors });
      }
    }
  }, props.ui.errors);
  const {
    classes,
    ui: { loading },
  } = props;
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { ...signup };
    props.signupUser(user, props.history);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignup({ ...signup, [name]: value });
  };
  return (
    <Grid container className={classes.form}>
      <Grid item xs>
        <img src={AppIcon} alt="Torre Logo" className={classes.image} />
        <Typography variant="h1" className={classes.pageTitle}>
          Sign Up
        </Typography>
        <Grid item xs>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              variant="filled"
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              error={signup.errors.email ? true : false}
              helperText={signup.errors.email}
              value={signup.email}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              id="password"
              name="password"
              type="password"
              label="Password"
              error={signup.errors.password ? true : false}
              helperText={signup.errors.password}
              className={classes.textField}
              value={signup.password}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              error={signup.errors.confirmPassword ? true : false}
              helperText={signup.errors.confirmPassword}
              className={classes.textField}
              value={signup.confirmPassword}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              id="handle"
              name="handle"
              type="text"
              label="Username"
              error={signup.errors.handle ? true : false}
              helperText={signup.errors.handle}
              className={classes.textField}
              value={signup.handle}
              onChange={handleChange}
            />
            {signup.errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {signup.errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
              Sign Up
            </Button>
          </form>
          <small className={classes.small}>
            Already have an Account ?Log in <Link to="/login">here</Link>
          </small>
        </Grid>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});

const mapActionsToProps = {
  signupUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SignUp));
