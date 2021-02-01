import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Post from "../components/Post";
import axios from "axios";
function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const createPost = (post) => {
    return <Post post={post} />;
  };
  let loading = posts ? posts.map(createPost) : <p>Loading...</p>;
  console.log(loading);
  return (
    <Grid container spacing={10}>
      <Grid item sm={4} xs={12}>
        {loading}
      </Grid>
      <Grid item sm={8} xs={12}>
        Content
      </Grid>
    </Grid>
  );
}
export default Home;
