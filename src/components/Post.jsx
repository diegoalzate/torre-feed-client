import React from "react";
import { withStyles } from "@material-ui/core/styles/withStyles";

//MUI STUFF
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    display: "flex",
  },
};
function Post(props) {
  const {
    classes,
    post: { text, createdAt, userHandle, postId, likeCount, commentCount },
  } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{userHandle}</Typography>
        <Typography variant="body2" color="textSecondary">
          {userHandle}
        </Typography>
        <Typography variant="body1">{text}</Typography>
      </CardContent>
    </Card>
  );
}
export default withStyles(styles)(Post);
