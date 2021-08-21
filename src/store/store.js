import { configureStore } from "@reduxjs/toolkit";
import posts from "./reducers/posts";
import users from "./reducers/users";
import comments from './reducers/comments'
import { api } from "./middleware/api";

export default configureStore({
  reducer: { posts, users, comments },
  middleware: [api],
});
