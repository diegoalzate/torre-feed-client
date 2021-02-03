import React, { Fragment, useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
// Redux stuff
import { connect } from "react-redux";
import { postPost, clearErrors } from "../redux/actions/dataActions";

const styles = (theme) => ({
  submitButton: {
    position: "relative",
    float: "right",
    color: "#CDDC39",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
  postText: {
    color: "#CDDC39",
    marginRight: "20px",
  },
});

function CreatePost(props) {
  const [post, setPost] = useState({
    open: false,
    text: "",
    errors: {},
  });

  useEffect(() => {
    if (props.ui.errors) {
      setPost({ ...post, errors: props.ui.errors });
    }
    if (!props.ui.errors) {
      setPost({ ...post, text: "", open: false, errors: {} });
    }
  }, [props.data.jobs]);

  const handleOpen = () => {
    setPost({ ...post, open: true });
  };
  const handleClose = () => {
    props.clearErrors();
    setPost({ ...post, open: false, errors: {} });
  };
  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setPost({ ...post, open: false });
    props.postPost({ text: post.text });
  };

  const { classes } = props;
  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip="Post!">
        <div className={classes.postText}>
          <AddIcon className={classes.submitButton} />
        </div>
      </MyButton>
      <Dialog open={post.open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Something worthwhile</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="text"
              type="text"
              label="what have you been up to?"
              multiline
              rows="3"
              placeholder="write here "
              error={post.errors.text ? true : false}
              helperText={post.errors.text}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  data: state.ui,
  ui: state.ui,
});

export default connect(mapStateToProps, { postPost, clearErrors })(
  withStyles(styles)(CreatePost)
);
