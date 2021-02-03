import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Post from "../components/Post";
import axios from "axios";
import JobsDashboard from "../components/JobsDashboard";
import CreatePost from "../components/CreatePost";
import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";
function Home(props) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    props.getPosts();
    setPosts(props.data.posts);
  }, []);
  useEffect(() => {
    setPosts(props.data.posts);
  }, [props.data.posts]);

  const createPost = (post) => {
    return <Post post={post} key={post.postId} />;
  };
  let loading = posts ? posts.map(createPost) : <p>Loading...</p>;

  return (
    <Grid container spacing={10}>
      <Grid item sm={4} xs={12}>
        <JobsDashboard />
      </Grid>
      <Grid item sm={8} xs={12}>
        <CreatePost />
        {loading}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});
const mapActionsToProps = {
  getPosts,
};
export default connect(mapStateToProps, mapActionsToProps)(Home);
