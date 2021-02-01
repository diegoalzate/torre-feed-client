import { SET_JOBS } from "../types";
import axios from "axios";

export const getJobs = () => (dispatch) => {
  let simpleJobs = [];
  axios
    .post("/jobs")
    .then((res) => {
      console.log(res.data);
      res.data.forEach((job) => {
        console.log(job);
        let jobPreview = {};
        jobPreview.url = `https://torre.co/jobs/${job.id}`;
        jobPreview.title = job.objective;
        jobPreview.type = job.type;
        simpleJobs.push(jobPreview);
      });
      return simpleJobs;
    })
    .then((res) => {
      console.log(res);
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
