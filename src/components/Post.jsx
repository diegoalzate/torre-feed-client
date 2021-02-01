import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
//MUI STUFF
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

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
  const {
    classes,
    post: { text, createdAt, userHandle, postId, likeCount, commentCount },
  } = props;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography
          className={classes.userText}
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="secondary">
          {createdAt}
        </Typography>
        <Typography variant="body1" className={classes.contrastText}>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default withStyles(styles)(Post);
