import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//MUI STUFF
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DeletePost from "./DeletePost";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const styles = {
  card: {
    backgroundColor: "#27292D",
    marginBottom: 20,
  },
  content: {
    padding: 25,
  },
  userText: {
    color: "#CDDC39",
  },
  contrastText: {
    color: "#EAEAEA",
  },
  image: {
    minWidth: 200,
  },
};
function Post(props) {
  dayjs.extend(relativeTime);
  const {
    classes,
    post: { text, createdAt, userHandle, postId },
  } = props;

  const deleteButton =
    userHandle === props.handle ? <DeletePost postId={postId} /> : null;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography className={classes.userText} variant="h5">
          {userHandle}
        </Typography>
        <Typography variant="body2" color="secondary">
          {dayjs(createdAt).fromNow()} {deleteButton}
        </Typography>
        <Typography variant="body1" className={classes.contrastText}>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}
const mapStateToProps = (state) => ({
  autenticated: state.user.authenticated,
  handle: state.user.credentials.handle,
});
export default connect(mapStateToProps)(withStyles(styles)(Post));
