import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getJobs } from "../redux/actions/dataActions";
function JobsDashboard(props) {
  const [jobs, setJobs] = useState(["loading"]);
  const {
    classes,
    user: { handle, location },
    data: { jobs },
  } = props;
  useEffect(() => {
    if (props.user.authenticated) {
      setJobs(props.getJobs());
    }
  }, []);

  return "loading";
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});
const mapActionsToProps = {
  getJobs,
};

export default connect(mapStateToProps, mapActionsToProps)(JobsDashboard);
