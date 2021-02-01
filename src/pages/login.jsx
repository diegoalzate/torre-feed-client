import React, { useEffect, useState, useRef } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";
//MUI STUFF
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TextField, Button, useRadioGroup } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import themeFile from "../util/theme";
import useIsMount from "../util/useIsMount";
//Redux Stuff

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = themeFile;

function Login(props) {
  const isMount = useIsMount();

  const {
    classes,
    ui: { loading, errors },
  } = props;
  const [login, setLogin] = useState({
    email: "",
    password: "",
    errors: {},
  });
  useEffect(() => {
    if (!isMount) {
      if (props.ui.errors !== null) {
        setLogin({ ...login, errors: props.ui.errors });
      }
    }
  }, props.ui.errors);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { ...login };
    props.loginUser(user, props.history);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };
  return (
    <Grid container className={classes.form}>
      <Grid item xs>
        <img src={AppIcon} alt="Torre Logo" className={classes.image} />
        <Typography variant="h1" className={classes.pageTitle}>
          Login
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
              error={login.errors.email ? true : false}
              helperText={login.errors.email}
              value={login.email}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              id="password"
              name="password"
              type="password"
              label="Password"
              error={login.errors.email ? true : false}
              helperText={login.errors.password}
              className={classes.textField}
              value={login.password}
              onChange={handleChange}
            />
            {login.errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {login.errors.general}
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
              Login
            </Button>
          </form>
          <small className={classes.small}>
            Dont have an Account ? Sign Up <Link to="/signup">here</Link>
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
  loginUser,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
