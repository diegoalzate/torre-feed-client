import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";
//MUI STUFF
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TextField, Button, useRadioGroup } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import themeFile from "../util/theme";

import axios from "axios";

const styles = themeFile;

function Login(props) {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const { classes } = props;
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const user = { ...login };
    axios
      .post("/login", user)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        setLoading(false);
        props.history.push("/");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setErrors(err.response.data);
      });
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
              error={errors.email ? true : false}
              helperText={errors.email}
              value={login.email}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              id="password"
              name="password"
              type="password"
              label="Password"
              error={errors.email ? true : false}
              helperText={errors.password}
              className={classes.textField}
              value={login.password}
              onChange={handleChange}
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
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
export default withStyles(styles)(Login);
