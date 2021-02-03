import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
function Navbar(props) {
  return (
    <AppBar color="primary">
      <Toolbar className="nav-container">
        {props.authenticated ? (
          <div>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
          </div>
        ) : (
          <div>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>

            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});
export default connect(mapStateToProps)(Navbar);
