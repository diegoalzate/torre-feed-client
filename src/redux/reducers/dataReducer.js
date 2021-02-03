import {
  SET_JOBS,
  LOADING_USER,
  POST_POST,
  GET_POSTS,
  DELETE_POST,
} from "../types";

const initialState = {
  jobs: [],
  loading: false,
  posts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS: {
      return {
        ...state,
        posts: [...action.payload],
        loading: false,
      };
    }
    case DELETE_POST:
      const index = state.posts.findIndex(
        (post) => post.postId === action.payload
      );
      state.posts.splice(index, 1);

    case POST_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
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
