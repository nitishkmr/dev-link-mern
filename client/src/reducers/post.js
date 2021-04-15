import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  GET_POST,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case ADD_POST:
      return {
        ...state, // took all items from state as it is other than posts and loading
        posts: [payload, ...state.posts], // spreaded prev posts and added post received from payload
        loading: false,
      };
    case DELETE_POST:
      const updatedPosts = state.posts.filter((post) => post._id !== payload);
      // console.log(updatedPosts);
      return {
        ...state,
        posts: updatedPosts, // since the post was deleted, so it needs to be removed from the UI, i.e. from the Global state also so .filter is used on state.posts
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };

    default:
      return state;
  }
}

export default postReducer;
