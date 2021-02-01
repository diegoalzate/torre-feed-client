import { SET_JOBS, LOADING_USER } from "../types";

const initialState = {
  jobs: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_JOBS:
      return {
        ...state,
        loading: false,
        jobs: [...action.payload],
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
}
