import React, { useState, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deletePost } from "../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "relative",
    left: "90%",
    top: "10%",
    color: "#ffffff",
  },
};

function DeletePost(props) {
  const { classes } = props;

  const deleteCurrent = () => {
    props.deletePost(props.postId);
  };

  return (
    <Fragment>
      <Button onClick={deleteCurrent} color="secondary">
        Delete
      </Button>
    </Fragment>
  );
}

export default connect(null, { deletePost })(withStyles(styles)(DeletePost));
