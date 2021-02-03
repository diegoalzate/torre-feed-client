import {
  JOBS_LOADING,
  SET_JOBS,
  POST_POST,
  SET_ERRORS,
  CLEAR_ERRORS,
  DELETE_POST,
  GET_POSTS,
} from "../types";
import axios from "axios";
export const getPosts = () => (dispatch) => {
  axios
    .get("/posts")
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const getJobs = () => (dispatch) => {
  let simpleJobs = [];
  dispatch({ type: JOBS_LOADING });
  axios
    .post("/jobs")
    .then((res) => {
      res.data.forEach((job) => {
        let jobPreview = {};
        jobPreview.url = `https://torre.co/jobs/${job.id}`;
        jobPreview.title = job.objective;
        jobPreview.type = job.type;
        simpleJobs.push(jobPreview);
      });
      return simpleJobs;
    })
    .then((res) => {
      dispatch({ type: SET_JOBS, payload: res });
    })
    .catch((err) => {
      dispatch({
        type: SET_JOBS,
        payload: "Oops there seems to have been an error",
      });
      console.error(err);
    });
};

// Post a Post
export const postPost = (newPost) => (dispatch) => {
  axios
    .post("/post", newPost)
    .then((res) => {
      dispatch({
        type: POST_POST,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => console.log(err));
};
